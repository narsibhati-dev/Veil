"use client";

import type { ProofData } from "@/types";
import { formatSol, shortenAddress } from "@/lib/format";

interface ProofBoxProps {
  proof: ProofData | null;
}

function Field({ label, value, mono = true }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <span className="text-xs text-[#5e8a83] uppercase tracking-widest flex-shrink-0" style={{ fontFamily: "var(--font-nunito)" }}>
        {label}
      </span>
      <span
        className="text-xs text-[#0f1a16] text-right break-all"
        style={mono ? { fontFamily: "var(--font-jetbrains-mono)" } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

export default function ProofBox({ proof }: ProofBoxProps) {
  if (!proof) {
    return (
      <div className="rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#f7fbf9] flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#8db5ae]">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <p className="text-sm text-[#8db5ae] font-medium mb-1">No proof generated yet</p>
        <p className="text-xs text-[#8db5ae]/60">Complete a withdrawal to see the on-chain proof</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#8db5ae]" style={{ fontFamily: "var(--font-raleway)" }}>
          Withdrawal Proof
        </h3>
        <div className="flex items-center gap-2">
          {proof.isPartial && (
            <span className="px-2.5 py-1 text-xs bg-amber-500/10 border border-amber-500/25 text-amber-500 rounded-full font-medium">
              Partial
            </span>
          )}
          <span className="px-2.5 py-1 text-xs bg-[#3ab96b]/10 border border-[#3ab96b]/25 text-[#3ab96b] rounded-full font-medium">
            Verified on-chain ✓
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden divide-y divide-[#f0f7f4]">
        <Field
          label="Amount"
          value={`${formatSol(proof.amountLamports, 4)} SOL`}
        />
        <Field
          label="Fee"
          value={`${formatSol(proof.feeLamports, 6)} SOL`}
        />
        <Field
          label="Recipient"
          value={shortenAddress(proof.recipient, 10)}
        />
        <Field
          label="Signature"
          value={
            <a
              href={`https://explorer.solana.com/tx/${proof.signature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3ab96b] transition-colors underline underline-offset-2"
            >
              {shortenAddress(proof.signature, 12)}
            </a>
          }
        />
      </div>

      <p className="text-xs text-[#8db5ae] px-1 leading-relaxed">
        A Groth16 zero-knowledge proof was generated client-side and submitted via the relayer.
        The proof confirms UTXO ownership without revealing which deposit was spent.
      </p>
    </div>
  );
}
