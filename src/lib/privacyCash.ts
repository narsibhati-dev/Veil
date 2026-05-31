"use client";

import { PublicKey } from "@solana/web3.js";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import type { Note, ProofData } from "@/types";
import { connection } from "./connection";

export interface DepositResult {
  note: Note;
  signature: string;
}

export interface WithdrawResult {
  signature: string;
  proof: ProofData;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function rndHex(bytes: number): string {
  return Array.from({ length: bytes }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
  ).join("");
}

function lamportsToSolStr(lamports: number): string {
  const sol = lamports / 1_000_000_000;
  return sol % 1 === 0
    ? sol.toString()
    : sol.toFixed(9).replace(/\.?0+$/, "");
}

const BN254 = BigInt(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);

function rndField(): string {
  return (BigInt("0x" + rndHex(31)) % BN254).toString();
}

function mockGroth16Proof(): ProofData {
  return {
    proof: {
      a: [rndField(), rndField()],
      b: [
        [rndField(), rndField()],
        [rndField(), rndField()],
      ],
      c: [rndField(), rndField()],
    },
    publicInputs: [rndField(), rndField(), rndField()],
  };
}

// ─── WASM + EncryptionService singletons ─────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyVal = any;

let lightWasmPromise: Promise<AnyVal> | null = null;
const encryptionCache = new Map<string, AnyVal>();

async function getLightWasm(): Promise<AnyVal> {
  if (typeof window === "undefined") {
    throw new Error("WASM only available in browser");
  }
  if (!lightWasmPromise) {
    lightWasmPromise = import("@lightprotocol/hasher.rs").then(
      (m) => m.WasmFactory.getInstance()
    );
  }
  return lightWasmPromise;
}

async function getEncryptionService(wallet: WalletContextState): Promise<AnyVal> {
  if (!wallet.publicKey || !wallet.signMessage) {
    throw new Error("Wallet not connected or does not support signMessage");
  }
  const key = wallet.publicKey.toString();
  if (encryptionCache.has(key)) return encryptionCache.get(key)!;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { EncryptionService } = await import("privacycash/utils") as any;
  const service = new EncryptionService();

  const msgBytes = new TextEncoder().encode("Privacy Money account sign in");
  const rawSig = await wallet.signMessage(msgBytes);
  // Some wallet adapters wrap the result: { signature: Uint8Array }
  const sigBytes: Uint8Array =
    rawSig instanceof Uint8Array
      ? rawSig
      : (rawSig as AnyVal).signature;
  service.deriveEncryptionKeyFromSignature(sigBytes);

  encryptionCache.set(key, service);
  return service;
}

// ─── SDK surface ──────────────────────────────────────────────────────────────

export async function deposit(
  wallet: WalletContextState,
  amountLamports: number
): Promise<DepositResult> {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error("Wallet not connected");
  }

  const [lightWasm, encSvc, sdk] = await Promise.all([
    getLightWasm(),
    getEncryptionService(wallet),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("privacycash/utils") as Promise<any>,
  ]);

  const result = await sdk.deposit({
    lightWasm,
    storage: localStorage,
    keyBasePath: "/circuit2/transaction2",
    publicKey: wallet.publicKey,
    connection,
    amount_in_lamports: amountLamports,
    encryptionService: encSvc,
    transactionSigner: (tx: AnyVal) => wallet.signTransaction!(tx),
  });

  const note: Note = `veil-${lamportsToSolStr(amountLamports)}sol-${rndHex(32)}`;
  return { note, signature: result.tx };
}

export async function withdraw(
  wallet: WalletContextState,
  note: Note,
  recipientAddress: string
): Promise<WithdrawResult> {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  const match = note.match(/^veil-([0-9.]+)sol-/);
  const sol = match ? parseFloat(match[1]) : 0;
  const amountLamports = Math.round(sol * 1_000_000_000);
  if (!amountLamports) throw new Error("Invalid note format");

  const [lightWasm, encSvc, sdk] = await Promise.all([
    getLightWasm(),
    getEncryptionService(wallet),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("privacycash/utils") as Promise<any>,
  ]);

  const result = await sdk.withdraw({
    recipient: new PublicKey(recipientAddress),
    lightWasm,
    storage: localStorage,
    keyBasePath: "/circuit2/transaction2",
    publicKey: wallet.publicKey,
    connection,
    amount_in_lamports: amountLamports,
    encryptionService: encSvc,
  });

  return { signature: result.tx, proof: mockGroth16Proof() };
}

export async function getPrivateBalance(
  wallet: WalletContextState,
  _note: Note
): Promise<number> {
  if (!wallet.publicKey) return 0;
  try {
    const [, encSvc, sdk] = await Promise.all([
      getLightWasm(),
      getEncryptionService(wallet),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      import("privacycash/utils") as Promise<any>,
    ]);

    const utxos = await sdk.getUtxos({
      publicKey: wallet.publicKey,
      connection,
      encryptionService: encSvc,
      storage: localStorage,
    });

    return sdk.getBalanceFromUtxos(utxos).lamports;
  } catch {
    return 0;
  }
}
