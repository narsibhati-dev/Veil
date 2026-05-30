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
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          label="Total Shielded"
          value={`${formatSol(totalShielded)} SOL`}
          glow
        />
        <StatCard
          label="Total Withdrawn"
          value={`${formatSol(totalWithdrawn)} SOL`}
        />
      </div>

      <div className="rounded-xl border border-[#1e293b] bg-[#0f1629] p-4">
        <p className="text-xs text-[#475569] uppercase tracking-wider font-medium mb-4">
          Transactions
        </p>
        {txs.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-[#475569] text-sm">No transactions yet</p>
            <p className="text-[#334155] text-xs mt-1">
              Shield some SOL to get started
            </p>
          </div>
        ) : (
          txs.map((tx) => <TxItem key={`${tx.signature}-${tx.timestamp}`} tx={tx} />)
        )}
      </div>
    </div>
  );
}
