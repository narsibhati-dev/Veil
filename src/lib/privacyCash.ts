"use client";

import type { WalletContextState } from "@solana/wallet-adapter-react";
import type { Note, ProofData } from "@/types";

// TODO: replace mock bodies with real SDK once package is confirmed:
// import { PrivacyCash } from '<sdk-package>';
// import { DEVNET_RPC_URL, RELAYER_URL } from './constants';

export interface DepositResult {
  note: Note;
  signature: string;
}

export interface WithdrawResult {
  signature: string;
  proof: ProofData;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function rnd58(len: number): string {
  return Array.from(
    { length: len },
    () => BASE58[Math.floor(Math.random() * BASE58.length)]
  ).join("");
}

function rndHex(bytes: number): string {
  return Array.from({ length: bytes }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
  ).join("");
}

// BN254 scalar field prime — field elements must be < this value
const BN254 = BigInt(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);

function rndField(): string {
  const raw = BigInt("0x" + rndHex(31)) % BN254;
  return raw.toString();
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function lamportsToSolStr(lamports: number): string {
  const sol = lamports / 1_000_000_000;
  return sol % 1 === 0
    ? sol.toString()
    : sol.toFixed(9).replace(/\.?0+$/, "");
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

// ─── SDK surface ──────────────────────────────────────────────────────────────

export async function deposit(
  wallet: WalletContextState,
  amountLamports: number
): Promise<DepositResult> {
  void wallet;
  // Simulate wallet approval + commitment tx (~1.5 s)
  await sleep(1500);
  const sol = lamportsToSolStr(amountLamports);
  // Note format mirrors Tornado Cash: "obscura-<amount>sol-<32 byte secret hex>"
  const note: Note = `obscura-${sol}sol-${rndHex(32)}`;
  return { note, signature: rnd58(87) };
}

export async function withdraw(
  wallet: WalletContextState,
  note: Note,
  recipientAddress: string
): Promise<WithdrawResult> {
  void wallet;
  void note;
  void recipientAddress;
  // Simulate witness building (~2 s) + Groth16 WASM proof generation (~2–3 s)
  await sleep(4000 + Math.random() * 1500);
  return { signature: rnd58(87), proof: mockGroth16Proof() };
}

export async function getPrivateBalance(
  wallet: WalletContextState,
  note: Note
): Promise<number> {
  void wallet;
  await sleep(500);
  // Parse deposited amount from note string
  const match = note.match(/^obscura-([0-9.]+)sol-/);
  if (!match) return 0;
  const sol = parseFloat(match[1]);
  if (isNaN(sol) || sol <= 0) return 0;
  const lamports = Math.round(sol * 1_000_000_000);
  // Deduct ~0.5% relayer fee so balance reflects real-world behaviour
  return lamports - Math.round(lamports * 0.005);
}
