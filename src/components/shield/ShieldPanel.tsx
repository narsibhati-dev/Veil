"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useShield } from "@/hooks/useShield";
import { solToLamports } from "@/lib/format";
import Button from "@/components/ui/Button";
import NoteDisplay from "./NoteDisplay";
import type { ToastType } from "@/types";

const PRESETS = [0.05, 0.1, 0.5, 1];

interface ShieldPanelProps {
  onShielded: (note: string, amount: number, signature: string) => void;
  onToast: (msg: string, type: ToastType) => void;
}

export default function ShieldPanel({ onShielded, onToast }: ShieldPanelProps) {
  const { connected } = useWallet();
  const { shield, loading, result, reset } = useShield();
  const [amount, setAmount] = useState("0.1");
  const [confirmed, setConfirmed] = useState(false);

  const parsed = parseFloat(amount) || 0;
  const estFee = 0.001;
  const total  = parsed + estFee;

  async function handleShield() {
    const lamports = solToLamports(parsed);
    if (lamports <= 0) return;
    try {
      const res = await shield(lamports);
      onToast("SOL shielded! Save your private note.", "success");
      onShielded(res.note, lamports, res.signature);
    } catch (e) {
      onToast(e instanceof Error ? e.message : "Shield failed", "error");
    }
  }

  if (result && !confirmed) {
    return (
      <NoteDisplay
        note={result.note}
        signature={result.signature}
        onConfirm={() => { setConfirmed(true); reset(); }}
      />
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
          Shield SOL
        </h2>
        <p className="text-sm text-[#475569]">
          Deposit SOL into the privacy pool. Your commitment is added to a
          Merkle tree — no link to your address on-chain.
        </p>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#475569] mb-3">
          Amount
        </label>

        {/* Presets */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {PRESETS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-150 ${
                amount === String(a)
                  ? "bg-[#6366f1]/10 border-[#6366f1] text-[#6366f1]"
                  : "bg-[#161626] border-[#1e1e3a] text-[#475569] hover:border-[#2d2d5e] hover:text-[#94a3b8]"
              }`}
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {a} SOL
            </button>
          ))}
        </div>

        {/* Number input — hide native arrows */}
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            className="w-full bg-[#161626] border border-[#1e1e3a] rounded-xl px-4 py-4 text-center text-3xl text-[#f1f5f9] focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_24px_rgba(99,102,241,0.12)] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ fontFamily: "var(--font-space-mono)" }}
            placeholder="0.00"
          />
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#334155] pointer-events-none"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            SOL
          </span>
        </div>
      </div>

      {/* Fee summary */}
      <div className="rounded-xl border border-[#1e1e3a] bg-[#161626]/60 px-4 py-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#475569]">Deposit</span>
          <span
            className="text-[#94a3b8] tabular-nums"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {parsed.toFixed(4)} SOL
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#475569]">Est. fee</span>
          <span
            className="text-[#94a3b8] tabular-nums"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            ~{estFee.toFixed(3)} SOL
          </span>
        </div>
        <div className="flex justify-between text-sm border-t border-[#1e1e3a] pt-2">
          <span className="text-[#94a3b8] font-medium">Total</span>
          <span
            className="text-[#f1f5f9] font-semibold tabular-nums"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            ≈{total.toFixed(4)} SOL
          </span>
        </div>
      </div>

      <Button
        onClick={handleShield}
        loading={loading}
        disabled={!connected || parsed <= 0}
        size="lg"
        className="w-full"
      >
        {connected ? "Shield SOL →" : "Connect Wallet to Shield"}
      </Button>
    </div>
  );
}
