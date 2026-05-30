import { formatSol, shortenAddress } from "@/lib/format";
import type { TxRecord } from "@/types";

interface TxItemProps {
  tx: TxRecord;
}

export default function TxItem({ tx }: TxItemProps) {
  const isShield = tx.type === "shield";
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#1e293b] last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
            isShield
              ? "bg-[#00d4a0]/10 text-[#00d4a0]"
              : "bg-purple-500/10 text-purple-400"
          }`}
        >
          {isShield ? "↓" : "↑"}
        </div>
        <div>
          <p className="text-sm text-[#f1f5f9] font-medium">
            {isShield ? "Shielded" : "Withdrawn"}
          </p>
          <a
            href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#475569] font-mono hover:text-[#00d4a0]"
          >
            {shortenAddress(tx.signature, 8)}
          </a>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-semibold ${
            isShield ? "text-[#00d4a0]" : "text-purple-400"
          }`}
        >
          {isShield ? "−" : "+"}
          {formatSol(tx.amount)} SOL
        </p>
        <p className="text-xs text-[#475569]">
          {new Date(tx.timestamp).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
