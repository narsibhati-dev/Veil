"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { formatSol, shortenAddress } from "@/lib/format";
import type { Note } from "@/types";

interface BalanceCardProps {
  note: Note | null;
  balance: number | null;
  balanceLoading: boolean;
}

export default function BalanceCard({ note, balance, balanceLoading: loading }: BalanceCardProps) {
  const { publicKey } = useWallet();

  const hasBalance = balance !== null && balance > 0;

  return (
    <div
      data-testid="balance-card"
      className={`rounded-2xl  bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] p-6 transition-shadow duration-700 ${
        hasBalance
          ? "shadow-[0_0_48px_rgba(58,185,107,0.12)]"
          : "shadow-[0_0_48px_rgba(89,159,138,0.05)]"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Balance */}
        <div>
          <p
            className="text-xs uppercase tracking-widest text-[#5e8a83] mb-3"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Private Balance
          </p>

          {loading && balance === null ? (
            <div data-testid="balance-skeleton" className="h-12 w-44 bg-[#f7fbf9] rounded-xl animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2.5">
              <span
                data-testid="balance-value"
                className={`text-5xl font-bold tabular-nums leading-none ${
                  hasBalance ? "text-[#0f1a16]" : "text-[#8db5ae]"
                }`}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {balance !== null ? formatSol(balance, 4) : "–.––––"}
              </span>
              <span
                className="text-lg text-[#8db5ae]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                SOL
              </span>
            </div>
          )}

          {publicKey && (
            <div className="mt-4">
              <span
                className="inline-block px-2.5 py-1 text-xs text-[#8db5ae] bg-[#f7fbf9]  rounded-lg"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
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
              ? "border-[#3ab96b]/25 bg-[#3ab96b]/5"
              : "border-[#599F8A]/15 bg-[#599F8A]/5"
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
              fill={hasBalance ? "#3ab96b" : "#599F8A"}
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {!note && !publicKey && (
        <p className="mt-5 text-xs text-white/[0.18]">
          Connect a wallet and shield SOL to see your private balance
        </p>
      )}
      {!note && publicKey && (
        <p className="mt-5 text-xs text-[#8db5ae]">
          Shield SOL to create your private balance
        </p>
      )}
    </div>
  );
}
