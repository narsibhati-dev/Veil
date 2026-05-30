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

  const hasBalance = balance !== null && balance > 0;

  return (
    <div
      className={`rounded-2xl border border-[#1e1e3a] bg-[#0f0f1a] p-6 transition-shadow duration-700 ${
        hasBalance
          ? "shadow-[0_0_48px_rgba(16,185,129,0.12)]"
          : "shadow-[0_0_48px_rgba(99,102,241,0.05)]"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Balance */}
        <div>
          <p
            className="text-xs uppercase tracking-widest text-[#475569] mb-3"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Private Balance
          </p>

          {loading ? (
            <div className="h-12 w-44 bg-[#161626] rounded-xl animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2.5">
              <span
                className={`text-5xl font-bold tabular-nums leading-none ${
                  hasBalance ? "text-[#f1f5f9]" : "text-[#2d2d5e]"
                }`}
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {balance !== null ? formatSol(balance, 4) : "–.––––"}
              </span>
              <span
                className="text-lg text-[#334155]"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                SOL
              </span>
            </div>
          )}

          {publicKey && (
            <div className="mt-4">
              <span
                className="inline-block px-2.5 py-1 text-xs text-[#334155] bg-[#161626] border border-[#1e1e3a] rounded-lg"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {shortenAddress(publicKey.toBase58(), 6)}
              </span>
            </div>
          )}
        </div>

        {/* Shield icon */}
        <div
          className={`w-16 h-16 rounded-2xl border flex items-center justify-center flex-shrink-0 transition-all duration-700 ${
            hasBalance
              ? "border-[#10b981]/25 bg-[#10b981]/5"
              : "border-[#6366f1]/15 bg-[#6366f1]/5"
          }`}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L3 7l.01 5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
              fill={hasBalance ? "#10b981" : "#6366f1"}
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {!note && !publicKey && (
        <p className="mt-5 text-xs text-[#1e1e3a]">
          Connect a wallet and shield SOL to see your private balance
        </p>
      )}
      {!note && publicKey && (
        <p className="mt-5 text-xs text-[#2d2d5e]">
          Shield SOL to create your private balance
        </p>
      )}
    </div>
  );
}
