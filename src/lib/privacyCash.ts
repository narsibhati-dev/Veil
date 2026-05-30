"use client";

import type { WalletContextState } from "@solana/wallet-adapter-react";
import type { Note, ProofData } from "@/types";

// TODO: replace with actual Privacy Cash SDK import once package name is confirmed
// import { PrivacyCash } from '@privacy-cash/sdk';
// import { DEVNET_RPC_URL, RELAYER_URL } from './constants';

export interface DepositResult {
  note: Note;
  signature: string;
}

export interface WithdrawResult {
  signature: string;
  proof: ProofData;
}

export async function deposit(
  wallet: WalletContextState,
  amountLamports: number
): Promise<DepositResult> {
  void wallet;
  void amountLamports;
  // const pc = new PrivacyCash({ wallet, rpcUrl: DEVNET_RPC_URL, relayerUrl: RELAYER_URL });
  // return pc.deposit(amountLamports);
  throw new Error("Privacy Cash SDK not wired yet — update lib/privacyCash.ts");
}

export async function withdraw(
  wallet: WalletContextState,
  note: Note,
  recipientAddress: string
): Promise<WithdrawResult> {
  void wallet;
  void note;
  void recipientAddress;
  // const pc = new PrivacyCash({ wallet, rpcUrl: DEVNET_RPC_URL, relayerUrl: RELAYER_URL });
  // return pc.withdraw({ note, recipient: recipientAddress });
  throw new Error("Privacy Cash SDK not wired yet — update lib/privacyCash.ts");
}

export async function getPrivateBalance(
  wallet: WalletContextState,
  note: Note
): Promise<number> {
  void wallet;
  void note;
  // const pc = new PrivacyCash({ wallet, rpcUrl: DEVNET_RPC_URL, relayerUrl: RELAYER_URL });
  // return pc.getPrivateBalance(note);
  throw new Error("Privacy Cash SDK not wired yet — update lib/privacyCash.ts");
}
