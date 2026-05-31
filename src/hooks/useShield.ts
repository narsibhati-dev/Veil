"use client";

import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletError } from "@solana/wallet-adapter-base";
import { deposit, type DepositResult } from "@/lib/privacyCash";

export function useShield() {
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DepositResult | null>(null);

  const shield = useCallback(
    async (amountLamports: number) => {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const res = await deposit(wallet, amountLamports);
        setResult(res);
        return res;
      } catch (e) {
        if (e instanceof WalletError) return; // wallet cancelled/rejected — user knows, no toast
        const msg = e instanceof Error ? e.message : "Deposit failed";
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [wallet]
  );

  return { shield, loading, error, result, reset: () => setResult(null) };
}
