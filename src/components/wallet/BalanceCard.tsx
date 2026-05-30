"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePrivateBalance } from "@/hooks/usePrivateBalance";
import { formatSol, shortenAddress } from "@/lib/format";
import type { Note } from "@/types";

interface BalanceCardProps {
  note: Note | null;
}

export default function BalanceCard({ note }: BalanceCardProps) {
  const { publicKey } = useWallet();
  const { balance, loading } = usePrivateBalance(note);

  return (
    <div className="rounded-2xl border border-[#1e293b] bg-gradient-to-br from-[#0f1629] to-[#111827] p-6 shadow-[0_0_40px_rgba(0,212,160,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-[#475569] uppercase tracking-wider font-medium">
          Private Balance
        </span>
        {publicKey && (
          <span className="text-xs text-[#475569] font-mono bg-[#0f1629] px-2 py-1 rounded-md border border-[#1e293b]">
            {shortenAddress(publicKey.toBase58())}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        {loading ? (
          <div className="h-10 w-32 bg-[#1e293b] animate-pulse rounded-lg" />
        ) : (
          <>
            <span className="text-4xl font-black text-[#f1f5f9]">
              {balance !== null ? formatSol(balance) : "–"}
            </span>
            <span className="text-lg text-[#475569] font-medium">SOL</span>
          </>
        )}
      </div>
      {!note && (
        <p className="text-xs text-[#475569] mt-3">
          Shield SOL to see your private balance
        </p>
      )}
    </div>
  );
}
