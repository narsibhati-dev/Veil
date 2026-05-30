import { formatSol, shortenAddress } from "@/lib/format";
import type { TxRecord } from "@/types";

interface TxItemProps {
  tx: TxRecord;
}

export default function TxItem({ tx }: TxItemProps) {
  const isShield = tx.type === "shield";
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#e6f0ed] last:border-0 hover:bg-[#f7fbf9] transition-colors">
      {/* Direction icon */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isShield
            ? "bg-[#599F8A]/10 border border-[#599F8A]/20"
            : "bg-[#3ab96b]/10 border border-[#3ab96b]/20"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={isShield ? "text-[#599F8A]" : "text-[#3ab96b]"}
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
        <p className="text-sm text-[#0f1a16] font-medium">
          {isShield ? "Shielded" : "Withdrawn"}
        </p>
        <a
          href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#8db5ae] hover:text-[#599F8A] transition-colors truncate block"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {shortenAddress(tx.signature, 8)}
        </a>
      </div>

      {/* Amount + date */}
      <div className="text-right flex-shrink-0">
        <p
          className={`text-sm font-semibold tabular-nums ${
            isShield ? "text-[#599F8A]" : "text-[#3ab96b]"
          }`}
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {isShield ? "−" : "+"}
          {formatSol(tx.amount, 4)} SOL
        </p>
        <p className="text-xs text-[#8db5ae]">
          {new Date(tx.timestamp).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
