"use client";

import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletError } from "@solana/wallet-adapter-base";
import { withdraw, type WithdrawResult } from "@/lib/privacyCash";

export type ProofStep = "idle" | "generating" | "done";

export function useWithdraw() {
  const wallet = useWallet();
  const [proofStep, setProofStep] = useState<ProofStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WithdrawResult | null>(null);

  const executeWithdraw = useCallback(
    async (amountLamports: number, recipient: string) => {
      setError(null);
      setResult(null);
      setProofStep("generating");
      try {
        const res = await withdraw(wallet, amountLamports, recipient);
        setResult(res);
        setProofStep("done");
        return res;
      } catch (e) {
        if (e instanceof WalletError) { setProofStep("idle"); return; }
        const msg = e instanceof Error ? e.message : "Withdrawal failed";
        setError(msg);
        setProofStep("idle");
        throw e;
      }
    },
    [wallet]
  );

  const reset = useCallback(() => {
    setProofStep("idle");
    setResult(null);
    setError(null);
  }, []);

  return { executeWithdraw, proofStep, error, result, reset };
}
