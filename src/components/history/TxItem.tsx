import { formatSol, shortenAddress } from "@/lib/format";
import type { TxRecord } from "@/types";

interface TxItemProps {
  tx: TxRecord;
}

export default function TxItem({ tx }: TxItemProps) {
  const isShield = tx.type === "shield";
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1e1e3a] last:border-0 hover:bg-[#161626]/40 transition-colors">
      {/* Direction icon */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isShield
            ? "bg-[#6366f1]/10 border border-[#6366f1]/20"
            : "bg-[#10b981]/10 border border-[#10b981]/20"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={isShield ? "text-[#6366f1]" : "text-[#10b981]"}
        >
          <path
            d="M12 2L3 7l.01 5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
            fill="currentColor"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* Label + signature */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#f1f5f9] font-medium">
          {isShield ? "Shielded" : "Withdrawn"}
        </p>
        <a
          href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#334155] hover:text-[#6366f1] transition-colors truncate block"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          {shortenAddress(tx.signature, 8)}
        </a>
      </div>

      {/* Amount + date */}
      <div className="text-right flex-shrink-0">
        <p
          className={`text-sm font-semibold tabular-nums ${
            isShield ? "text-[#6366f1]" : "text-[#10b981]"
          }`}
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          {isShield ? "−" : "+"}
          {formatSol(tx.amount, 4)} SOL
        </p>
        <p className="text-xs text-[#334155]">
          {new Date(tx.timestamp).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
