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

// ─── WASM + EncryptionService singletons ─────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyVal = any;

let lightWasmPromise: Promise<AnyVal> | null = null;
// Promise-based cache prevents duplicate signMessage prompts on concurrent calls
const encryptionCache = new Map<string, Promise<AnyVal>>();

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

  const promise = (async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { EncryptionService } = await import("privacycash/utils") as any;
    const service = new EncryptionService();
    const msgBytes = new TextEncoder().encode("Privacy Money account sign in");
    const rawSig = await wallet.signMessage!(msgBytes);
    const sigBytes: Uint8Array =
      rawSig instanceof Uint8Array ? rawSig : (rawSig as AnyVal).signature;
    service.deriveEncryptionKeyFromSignature(sigBytes);
    return service;
  })();

  encryptionCache.set(key, promise);
  // If signMessage is cancelled or fails, remove the rejected entry so the
  // next attempt prompts again instead of returning an immediately-rejected Promise.
  promise.catch(() => encryptionCache.delete(key));
  return promise;
}

/** Returns true only if the encryption key has already been derived this session. */
export function hasEncryptionKey(publicKeyStr: string): boolean {
  return encryptionCache.has(publicKeyStr);
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

  // Note stores the amount for display; actual UTXO state lives in localStorage via SDK
  const note: Note = `veil-${lamportsToSolStr(amountLamports)}sol-${rndHex(8)}`;
  return { note, signature: result.tx };
}

export async function withdraw(
  wallet: WalletContextState,
  amountLamports: number,
  recipientAddress: string
): Promise<WithdrawResult> {
  if (!wallet.publicKey) throw new Error("Wallet not connected");
  if (amountLamports <= 0) throw new Error("Amount must be greater than 0");

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

  return {
    signature: result.tx,
    proof: {
      signature: result.tx,
      amountLamports: result.amount_in_lamports,
      feeLamports: result.fee_in_lamports,
      recipient: result.recipient,
      isPartial: result.isPartial,
    },
  };
}

export async function getPrivateBalance(
  wallet: WalletContextState,
  _note: Note
): Promise<number> {
  if (!wallet.publicKey) return 0;

  const controller = new AbortController();
  // areUtxosSpent inside getUtxos retries indefinitely on RPC errors; cap the whole scan.
  const timeoutId = setTimeout(() => controller.abort(), 90_000);

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
      abortSignal: controller.signal,
    });

    return sdk.getBalanceFromUtxos(utxos).lamports;
  } catch (e) {
    if (e instanceof Error && e.message === "aborted") {
      throw new Error("balance_scan_timeout");
    }
    return 0;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Clears the SDK's localStorage UTXO cache for this wallet session
export function clearPrivacyPoolCache(): void {
  // SDK keys are prefixed with first 6 chars of the program ID
  const prefix = "ATZj4j";
  Object.keys(localStorage).forEach((k) => {
    if (k.includes(prefix) || k === "fetch_offset" || k === "encrypted_outputs") {
      localStorage.removeItem(k);
    }
  });
  localStorage.removeItem("veil_balance");
  encryptionCache.clear();
}
