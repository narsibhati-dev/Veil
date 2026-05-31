"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getPrivateBalance, hasEncryptionKey } from "@/lib/privacyCash";
import type { Note } from "@/types";

const LS_KEY = "veil_balance";

function readCachedBalance(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function writeCachedBalance(value: number | null): void {
  if (typeof window === "undefined") return;
  if (value === null) localStorage.removeItem(LS_KEY);
  else localStorage.setItem(LS_KEY, String(value));
}

export function usePrivateBalance(note: Note | null) {
  const wallet = useWallet();
  const [balance, setBalanceState] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const scanInFlight = useRef(false);

  // Hydrate from localStorage on mount so the balance shows instantly across reloads
  useEffect(() => {
    const cached = readCachedBalance();
    if (cached !== null) setBalanceState(cached);
  }, []);

  const setBalance = useCallback((value: number | null | ((prev: number | null) => number | null)) => {
    setBalanceState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      writeCachedBalance(next);
      return next;
    });
  }, []);

  // Use only the wallet pieces we need so unrelated wallet-context re-renders don't restart the scan
  const publicKeyStr = wallet.publicKey?.toString() ?? null;
  const connected = wallet.connected;

  const refresh = useCallback(async () => {
    if (!connected || !publicKeyStr) return;
    if (!hasEncryptionKey(publicKeyStr)) return;
    if (scanInFlight.current) return; // guard against overlapping scans from re-renders
    scanInFlight.current = true;
    setLoading(true);
    try {
      const bal = await getPrivateBalance(wallet, note ?? "");
      setBalance(bal);
    } catch (e) {
      if (e instanceof Error && e.message === "balance_scan_timeout") {
        // Timed out — leave current balance as-is (optimistic value stays visible)
        return;
      }
      // silently fail — balance stays as last known value
    } finally {
      setLoading(false);
      scanInFlight.current = false;
    }
    // wallet is intentionally excluded — useWallet() returns a fresh object every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, publicKeyStr, note, setBalance]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, loading, refresh, setBalance };
}
