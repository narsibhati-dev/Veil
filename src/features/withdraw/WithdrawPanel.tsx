"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWithdraw } from "@/hooks/useWithdraw";
import { solToLamports, formatSol } from "@/lib/format";
import Button from "@/components/ui/Button";
import ProofStatus from "./ProofStatus";
import type { Note, ToastType, ProofData } from "@/types";

interface WithdrawPanelProps {
  note: Note | null;
  onToast: (msg: string, type: ToastType) => void;
  onWithdrawn: (sig: string, amount: number) => void;
  onProof?: (proof: ProofData) => void;
}

const CARD_SHA = "shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.05),0_2px_8px_0px_rgba(0,0,0,0.04)]";

export default function WithdrawPanel({ note, onToast, onWithdrawn, onProof }: WithdrawPanelProps) {
  const { connected, publicKey } = useWallet();
  const { executeWithdraw, proofStep, error, result, reset } = useWithdraw();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const isProcessing = proofStep === "generating";
  const parsedSol = parseFloat(amount) || 0;

  // Parse the shielded amount from the note display string (e.g. "veil-0.1sol-...")
  const noteMatch = note?.match(/^veil-([0-9.]+)sol-/);
  const shieldedSol = noteMatch ? parseFloat(noteMatch[1]) : null;

  async function handleWithdraw() {
    const dest = recipient.trim() || publicKey?.toBase58() || "";
    if (!dest || parsedSol <= 0) return;
    const lamports = solToLamports(parsedSol);
    try {
      const res = await executeWithdraw(lamports, dest);
      if (!res) return; // wallet interaction cancelled — useWithdraw swallowed it silently
      onToast("Withdrawal successful!", "success");
      onProof?.(res.proof);
      onWithdrawn(res.signature, res.proof.amountLamports);
    } catch (e) {
      onToast(e instanceof Error ? e.message : "Withdrawal failed", "error");
    }
  }

  if (proofStep === "done" && result) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-[#3ab96b]/25 bg-[#3ab96b]/5 p-6 text-center shadow-[0_0_32px_rgba(58,185,107,0.1)]">
          <div className="w-14 h-14 rounded-full border-2 border-[#3ab96b] flex items-center justify-center mx-auto mb-4 text-[#3ab96b] text-2xl">
            ✓
          </div>
          <p className="text-[#3ab96b] font-bold text-lg mb-1" style={{ fontFamily: "var(--font-raleway)" }}>
            Withdrawal Complete
          </p>
          <p className="text-xs text-[#5e8a83] mb-1">
            {formatSol(result.proof.amountLamports, 4)} SOL sent privately via zero-knowledge proof
          </p>
          {result.proof.isPartial && (
            <p className="text-xs text-amber-500 mb-2">Partial withdrawal — remaining balance still shielded</p>
          )}
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
    <div data-testid="withdraw-panel" className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#0f1a16] mb-1" style={{ fontFamily: "var(--font-raleway)" }}>
          Withdraw
        </h2>
        <p className="text-sm text-[#5e8a83]">
          Prove ownership of shielded funds without revealing which deposit they came from.
        </p>
      </div>

      <ProofStatus step={proofStep} />

      {/* Amount */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="withdraw-amount" className="block text-xs uppercase tracking-widest text-[#5e8a83]">
            Amount (SOL)
          </label>
          {shieldedSol !== null && (
            <button
              data-testid="withdraw-max-btn"
              onClick={() => setAmount(String(shieldedSol))}
              className="text-xs text-[#599F8A] hover:text-[#5e8a83] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/70 focus-visible:ring-offset-1 rounded"
            >
              Max: {shieldedSol} SOL
            </button>
          )}
        </div>
        <div className={`bg-white rounded-xl ${CARD_SHA} flex items-center gap-3 px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#599F8A]/60 transition-shadow`}>
          <input
            id="withdraw-amount"
            data-testid="withdraw-amount-input"
            type="number"
            name="amount"
            autoComplete="off"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isProcessing}
            min="0.001"
            step="0.001"
            placeholder="0.00"
            className="flex-1 text-3xl font-bold text-[#0f1a16] bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-40"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            aria-label="Withdrawal amount in SOL"
          />
          <span
            className="text-sm font-semibold text-[#8db5ae] flex-shrink-0"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            SOL
          </span>
        </div>
        <p className="mt-1.5 text-xs text-[#8db5ae]">
          Your private balance is shown at the top of the page.
        </p>
      </div>

      {/* Recipient */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="withdraw-recipient" className="block text-xs uppercase tracking-widest text-[#5e8a83]">
            Recipient
          </label>
          {publicKey && (
            <button
              onClick={() => setRecipient(publicKey.toBase58())}
              className="text-xs text-[#599F8A] hover:text-[#5e8a83] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/70 focus-visible:ring-offset-1 rounded"
            >
              Use connected wallet
            </button>
          )}
        </div>
        <input
          id="withdraw-recipient"
          data-testid="withdraw-recipient-input"
          type="text"
          name="recipient"
          autoComplete="off"
          spellCheck={false}
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={isProcessing}
          className="w-full bg-[#f7fbf9] rounded-xl px-4 py-3 text-[#8db5ae] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/70 focus-visible:ring-offset-1 transition-all disabled:opacity-40"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          placeholder="Solana address (defaults to connected wallet)"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-800/40 bg-red-950/20 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <Button
        data-testid="withdraw-submit-btn"
        onClick={handleWithdraw}
        loading={isProcessing}
        disabled={!connected || parsedSol <= 0 || isProcessing}
        size="lg"
        className="w-full"
      >
        {isProcessing ? "Generating ZK Proof…" : parsedSol > 0 ? `Withdraw ${parsedSol} SOL →` : "Enter an amount"}
      </Button>
    </div>
  );
}
