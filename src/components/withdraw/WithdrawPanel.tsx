"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWithdraw } from "@/hooks/useWithdraw";
import Button from "@/components/ui/Button";
import ProofStatus from "./ProofStatus";
import type { ToastType } from "@/types";

interface WithdrawPanelProps {
  onToast: (msg: string, type: ToastType) => void;
  onWithdrawn: (sig: string) => void;
}

export default function WithdrawPanel({
  onToast,
  onWithdrawn,
}: WithdrawPanelProps) {
  const { connected, publicKey } = useWallet();
  const { executeWithdraw, proofStep, error, result, reset } = useWithdraw();
  const [note, setNote] = useState("");
  const [recipient, setRecipient] = useState("");

  const isProcessing = proofStep === "generating";

  async function handleWithdraw() {
    const dest = recipient || publicKey?.toBase58() || "";
    if (!note.trim() || !dest) return;
    try {
      const res = await executeWithdraw(note.trim(), dest);
      onToast("Withdrawal successful!", "success");
      onWithdrawn(res.signature);
    } catch (e) {
      onToast(e instanceof Error ? e.message : "Withdrawal failed", "error");
    }
  }

  if (proofStep === "done" && result) {
    return (
      <div className="space-y-4 text-center py-6">
        <div className="w-16 h-16 rounded-full bg-[#00d4a0]/10 border border-[#00d4a0] flex items-center justify-center text-2xl mx-auto">
          ✓
        </div>
        <p className="text-[#00d4a0] font-semibold">Withdrawal complete</p>
        <a
          href={`https://explorer.solana.com/tx/${result.signature}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#475569] font-mono hover:text-[#00d4a0] block"
        >
          {result.signature.slice(0, 32)}…
        </a>
        <Button onClick={reset} variant="secondary">
          New Withdrawal
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <ProofStatus step={proofStep} />

      <div>
        <label className="block text-sm text-[#94a3b8] mb-2">
          Private Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={isProcessing}
          rows={4}
          className="w-full bg-[#0f1629] border border-[#1e293b] rounded-lg px-4 py-3 text-[#f1f5f9] font-mono text-xs focus:outline-none focus:border-[#00d4a0] transition-colors resize-none disabled:opacity-50"
          placeholder="Paste your private note here…"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94a3b8] mb-2">
          Recipient
          {publicKey && (
            <button
              onClick={() => setRecipient(publicKey.toBase58())}
              className="ml-2 text-xs text-[#00d4a0] hover:text-[#00b88a]"
            >
              Use my wallet
            </button>
          )}
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={isProcessing}
          className="w-full bg-[#0f1629] border border-[#1e293b] rounded-lg px-4 py-3 text-[#f1f5f9] font-mono text-sm focus:outline-none focus:border-[#00d4a0] transition-colors disabled:opacity-50"
          placeholder="Recipient Solana address"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-800 bg-red-900/10 px-4 py-3 text-red-400 text-sm">
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
        {isProcessing ? "Generating ZK Proof…" : "Withdraw"}
      </Button>
    </div>
  );
}
