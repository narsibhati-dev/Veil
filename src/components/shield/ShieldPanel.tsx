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
          className="text-lg font-bold text-[#0f1a16] mb-1"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Shield SOL
        </h2>
        <p className="text-sm text-[#5e8a83]">
          Deposit SOL into the privacy pool. Your commitment is added to a
          Merkle tree, no link to your address on-chain.
        </p>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="shield-amount" className="block text-xs uppercase tracking-widest text-[#5e8a83] mb-3">
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
                  ? "bg-[#599F8A]/10 border-[#599F8A] text-[#599F8A]"
                  : "bg-[#f7fbf9] border-[#e6f0ed] text-[#5e8a83] hover:border-[#d0e8e1] hover:text-[#8db5ae]"
              }`}
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {a} SOL
            </button>
          ))}
        </div>

        {/* Number input - hide native arrows */}
        <div className="relative">
          <input
            id="shield-amount"
            type="number"
            name="amount"
            autoComplete="off"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            className="w-full bg-[#f7fbf9] rounded-xl px-4 py-4 text-center text-3xl text-[#0f1a16] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/70 focus-visible:ring-offset-1 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            placeholder="0.00"
          />
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8db5ae] pointer-events-none"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            SOL
          </span>
        </div>
      </div>

      {/* Fee summary */}
      <div className="rounded-xl  bg-[#f7fbf9] px-4 py-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#5e8a83]">Deposit</span>
          <span
            className="text-[#8db5ae] tabular-nums"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {parsed.toFixed(4)} SOL
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#5e8a83]">Est. fee</span>
          <span
            className="text-[#8db5ae] tabular-nums"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            ~{estFee.toFixed(3)} SOL
          </span>
        </div>
        <div className="flex justify-between text-sm border-t border-[#e6f0ed] pt-2">
          <span className="text-[#8db5ae] font-medium">Total</span>
          <span
            className="text-[#0f1a16] font-semibold tabular-nums"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
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
