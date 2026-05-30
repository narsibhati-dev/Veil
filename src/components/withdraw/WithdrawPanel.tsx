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
        <div className="rounded-2xl border border-[#3ab96b]/25 bg-[#3ab96b]/5 p-6 text-center shadow-[0_0_32px_rgba(58,185,107,0.1)]">
          <div className="w-14 h-14 rounded-full border-2 border-[#3ab96b] flex items-center justify-center mx-auto mb-4 text-[#3ab96b] text-2xl">
            ✓
          </div>
          <p
            className="text-[#3ab96b] font-bold text-lg mb-1"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Withdrawal Complete
          </p>
          <p className="text-xs text-[#5e8a83] mb-3">
            Funds sent privately via zero-knowledge proof
          </p>
          <a
            href={`https://explorer.solana.com/tx/${result.signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#8db5ae] hover:text-[#3ab96b] transition-colors block truncate"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
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
          className="text-lg font-bold text-[#0f1a16] mb-1"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Withdraw
        </h2>
        <p className="text-sm text-[#5e8a83]">
          Prove ownership of a shielded deposit without revealing which one.
        </p>
      </div>

      <ProofStatus step={proofStep} />

      {/* Note */}
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#5e8a83] mb-2">
          Private Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={isProcessing}
          rows={5}
          className="w-full bg-[#f7fbf9]  rounded-xl px-4 py-3 text-[#8db5ae] text-xs focus:outline-none focus:border-[#599F8A] focus:shadow-[0_0_24px_rgba(89,159,138,0.12)] transition-all resize-none disabled:opacity-40"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          placeholder="Paste your private note here…"
        />
      </div>

      {/* Recipient */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs uppercase tracking-widest text-[#5e8a83]">
            Recipient
          </label>
          {publicKey && (
            <button
              onClick={() => setRecipient(publicKey.toBase58())}
              className="text-xs text-[#599F8A] hover:text-[#5e8a83] transition-colors"
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
          className="w-full bg-[#f7fbf9]  rounded-xl px-4 py-3 text-[#8db5ae] text-sm focus:outline-none focus:border-[#599F8A] focus:shadow-[0_0_24px_rgba(89,159,138,0.12)] transition-all disabled:opacity-40"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
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
