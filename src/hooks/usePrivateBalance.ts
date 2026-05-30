"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getPrivateBalance } from "@/lib/privacyCash";
import type { Note } from "@/types";

export function usePrivateBalance(note: Note | null) {
  const wallet = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!wallet.connected || !note) return;
    setLoading(true);
    setError(null);
    try {
      const bal = await getPrivateBalance(wallet, note);
      setBalance(bal);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  }, [wallet, note]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, loading, error, refresh };
}
