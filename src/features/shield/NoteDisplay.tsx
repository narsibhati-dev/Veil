"use client";

import Button from "@/components/ui/Button";
import { shortenAddress } from "@/lib/format";
import { formatSol } from "@/lib/format";

interface NoteDisplayProps {
  signature: string;
  amountLamports: number;
  onConfirm: () => void;
}

export default function NoteDisplay({ signature, amountLamports, onConfirm }: NoteDisplayProps) {
  return (
    <div className="space-y-5">
      {/* Success */}
      <div className="rounded-xl border border-[#3ab96b]/30 bg-[#3ab96b]/5 p-4 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-[#3ab96b] flex items-center justify-center mx-auto mb-3 text-[#3ab96b] text-xl">
          ✓
        </div>
        <p className="text-[#3ab96b] font-bold text-base mb-1" style={{ fontFamily: "var(--font-raleway)" }}>
          {formatSol(amountLamports, 4)} SOL shielded
        </p>
        <p className="text-xs text-[#5e8a83]">
          Your funds are in the privacy pool. Use the Withdraw tab to reclaim them from this device.
        </p>
      </div>

      {/* Tx link */}
      <div className="rounded-xl bg-[#f7fbf9] border border-[#e6f0ed] px-4 py-3">
        <p className="text-xs text-[#5e8a83] uppercase tracking-widest mb-1.5" style={{ fontFamily: "var(--font-nunito)" }}>
          Transaction
        </p>
        <a
          href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#8db5ae] hover:text-[#599F8A] transition-colors break-all"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {shortenAddress(signature, 16)}
        </a>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-amber-700/30 bg-amber-950/15 px-4 py-3">
        <p className="text-amber-400/90 text-xs leading-relaxed">
          ⚠ Withdrawals only work from <strong>this device and browser</strong> while your session data is intact. Clearing browser storage or switching devices will require re-depositing.
        </p>
      </div>

      <Button onClick={onConfirm} size="lg" className="w-full">
        Continue to Withdraw →
      </Button>
    </div>
  );
}
