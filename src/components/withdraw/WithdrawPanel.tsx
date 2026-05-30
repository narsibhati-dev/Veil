"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWithdraw } from "@/hooks/useWithdraw";
import Button from "@/components/ui/Button";
import ProofStatus from "./ProofStatus";
import type { ToastType, ProofData } from "@/types";

interface WithdrawPanelProps {
  onToast: (msg: string, type: ToastType) => void;
  onWithdrawn: (sig: string) => void;
  onProof?: (proof: ProofData) => void;
}

export default function WithdrawPanel({
  onToast,
  onWithdrawn,
  onProof,
}: WithdrawPanelProps) {
  const { connected, publicKey } = useWallet();
  const { executeWithdraw, proofStep, error, result, reset } = useWithdraw();
  const [note, setNote]           = useState("");
  const [recipient, setRecipient] = useState("");

  const isProcessing = proofStep === "generating";

  async function handleWithdraw() {
    const dest = recipient || publicKey?.toBase58() || "";
    if (!note.trim() || !dest) return;
    try {
      const res = await executeWithdraw(note.trim(), dest);
      onToast("Withdrawal successful!", "success");
      onProof?.(res.proof);
      onWithdrawn(res.signature);
    } catch (e) {
      onToast(e instanceof Error ? e.message : "Withdrawal failed", "error");
    }
  }

  if (proofStep === "done" && result) {
    return (
      <div className="space-y-5">
        {/* Success card */}
        <div className="rounded-2xl border border-[#10b981]/25 bg-[#10b981]/5 p-6 text-center shadow-[0_0_32px_rgba(16,185,129,0.1)]">
          <div className="w-14 h-14 rounded-full border-2 border-[#10b981] flex items-center justify-center mx-auto mb-4 text-[#10b981] text-2xl">
            ✓
          </div>
          <p
            className="text-[#10b981] font-bold text-lg mb-1"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Withdrawal Complete
          </p>
          <p className="text-xs text-[#475569] mb-3">
            Funds sent privately via zero-knowledge proof
          </p>
          <a
            href={`https://explorer.solana.com/tx/${result.signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#334155] hover:text-[#10b981] transition-colors block truncate"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {result.signature.slice(0, 44)}…
          </a>
        </div>
        <Button onClick={reset} variant="secondary" className="w-full">
          New Withdrawal
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          className="text-lg font-bold text-[#f1f5f9] mb-1"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Withdraw
        </h2>
        <p className="text-sm text-[#475569]">
          Prove ownership of a shielded deposit without revealing which one.
        </p>
      </div>

      <ProofStatus step={proofStep} />

      {/* Note */}
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#475569] mb-2">
          Private Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={isProcessing}
          rows={5}
          className="w-full bg-[#161626] border border-[#1e1e3a] rounded-xl px-4 py-3 text-[#94a3b8] text-xs focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_24px_rgba(99,102,241,0.12)] transition-all resize-none disabled:opacity-40"
          style={{ fontFamily: "var(--font-space-mono)" }}
          placeholder="Paste your private note here…"
        />
      </div>

      {/* Recipient */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs uppercase tracking-widest text-[#475569]">
            Recipient
          </label>
          {publicKey && (
            <button
              onClick={() => setRecipient(publicKey.toBase58())}
              className="text-xs text-[#6366f1] hover:text-[#818cf8] transition-colors"
            >
              Use connected wallet
            </button>
          )}
        </div>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={isProcessing}
          className="w-full bg-[#161626] border border-[#1e1e3a] rounded-xl px-4 py-3 text-[#94a3b8] text-sm focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_24px_rgba(99,102,241,0.12)] transition-all disabled:opacity-40"
          style={{ fontFamily: "var(--font-space-mono)" }}
          placeholder="Solana address"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-800/40 bg-red-950/20 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <Button
        onClick={handleWithdraw}
        loading={isProcessing}
        disabled={!connected || !note.trim() || isProcessing}
        size="lg"
        className="w-full"
      >
        {isProcessing ? "Generating ZK Proof…" : "Withdraw →"}
      </Button>
    </div>
  );
}
