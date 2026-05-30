"use client";

import StatCard from "@/components/ui/StatCard";
import TxItem from "./TxItem";
import { formatSol } from "@/lib/format";
import type { TxRecord } from "@/types";

interface HistoryPanelProps {
  txs: TxRecord[];
}

export default function HistoryPanel({ txs }: HistoryPanelProps) {
  const totalShielded = txs
    .filter((t) => t.type === "shield")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawn = txs
    .filter((t) => t.type === "withdraw")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <h2
        className="text-lg font-bold text-[#f1f5f9]"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        History
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          label="Total Shielded"
          value={`${formatSol(totalShielded, 4)} SOL`}
          glow
        />
        <StatCard
          label="Total Withdrawn"
          value={`${formatSol(totalWithdrawn, 4)} SOL`}
        />
      </div>

      {/* Transaction list */}
      <div className="rounded-2xl border border-[#1e1e3a] bg-[#0f0f1a] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#1e1e3a]">
          <span
            className="text-xs uppercase tracking-widest text-[#475569]"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Transactions
          </span>
        </div>

        {txs.length === 0 ? (
          <div className="py-14 text-center">
            <div className="w-12 h-12 rounded-full bg-[#161626] border border-[#1e1e3a] flex items-center justify-center mx-auto mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#334155]">
                <path
                  d="M12 2L3 7l.01 5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
                  fill="currentColor"
                  opacity="0.4"
                />
              </svg>
            </div>
            <p className="text-[#334155] text-sm">No transactions yet</p>
            <p className="text-[#1e1e3a] text-xs mt-1">
              Shield some SOL to get started
            </p>
          </div>
        ) : (
          txs.map((tx) => (
            <TxItem key={`${tx.signature}-${tx.timestamp}`} tx={tx} />
          ))
        )}
      </div>
    </div>
  );
}
