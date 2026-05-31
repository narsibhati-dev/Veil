"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useShield } from "@/hooks/useShield";
import { solToLamports } from "@/lib/format";
import { ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import NoteDisplay from "./NoteDisplay";
import type { ToastType } from "@/types";

const PRESETS  = [0.05, 0.1, 0.5, 1];
const EST_FEE  = 0.001;
const CARD_SHA = "shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.05),0_2px_8px_0px_rgba(0,0,0,0.04)]";

interface ShieldPanelProps {
  onShielded: (note: string, amount: number, signature: string) => void;
  onToast:    (msg: string, type: ToastType) => void;
}

function SummaryRow({
  label,
  value,
  accent = false,
  bold   = false,
}: {
  label:   string;
  value:   string;
  accent?: boolean;
  bold?:   boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-sm text-[#5e8a83]">{label}</span>
      <span
        className={`text-sm tabular-nums ${
          accent ? "text-[#3ab96b] font-semibold" :
          bold   ? "text-[#0f1a16] font-semibold" :
                   "text-[#8db5ae]"
        }`}
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ShieldPanel({ onShielded, onToast }: ShieldPanelProps) {
  const { connected } = useWallet();
  const { shield, loading, result, reset } = useShield();
  const [amount, setAmount]   = useState("0.1");
  const [confirmed, setConfirmed] = useState(false);

  const parsed = parseFloat(amount) || 0;
  const total  = parsed + EST_FEE;

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
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#f0f8f5] flex items-center justify-center flex-shrink-0 mt-0.5">
          <ShieldCheck size={16} className="text-[#599F8A]" aria-hidden="true" />
        </div>
        <div>
          <h2
            className="text-base font-bold text-[#0f1a16] leading-snug"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Shield SOL
          </h2>
          <p className="text-xs text-[#8db5ae] mt-0.5 leading-relaxed">
            Deposit into the privacy pool. Your commitment is added to a
            Merkle tree — no on-chain link to your address.
          </p>
        </div>
      </div>

      {/* ── Amount card ── */}
      <div className="rounded-2xl border border-[#e6f0ed] bg-[#f7fbf9] p-4">

        {/* Preset pills */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {PRESETS.map((a) => {
            const active = amount === String(a);
            return (
              <button
                key={a}
                onClick={() => setAmount(String(a))}
                className={[
                  "px-3.5 py-1.5 text-xs rounded-full border font-medium transition-all",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/60",
                  active
                    ? "bg-[#599F8A] border-[#599F8A] text-white shadow-sm"
                    : "bg-white border-[#d0e8e1] text-[#5e8a83] hover:border-[#599F8A]/50 hover:text-[#599F8A]",
                ].join(" ")}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {a} SOL
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div
          className={`bg-white rounded-xl ${CARD_SHA} flex items-center gap-3 px-4 py-3.5
            focus-within:ring-2 focus-within:ring-[#599F8A]/60 transition-shadow`}
        >
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
            placeholder="0.00"
            className="flex-1 text-3xl font-bold text-[#0f1a16] bg-transparent focus:outline-none
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            aria-label="Amount in SOL"
          />
          <span
            className="text-sm font-semibold text-[#8db5ae] flex-shrink-0"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            SOL
          </span>
        </div>
      </div>

      {/* ── Summary ── */}
      <div className={`bg-white rounded-2xl ${CARD_SHA} divide-y divide-[#f0f7f4] overflow-hidden`}>
        <SummaryRow label="Pool"    value="Solana Devnet" />
        <SummaryRow label="Privacy" value="Anonymous ●" accent />
        <SummaryRow label="Est. fee" value={`~${EST_FEE.toFixed(3)} SOL`} />
        <SummaryRow label="Total"   value={`≈${total.toFixed(4)} SOL`} bold />
      </div>

      {/* ── CTA ── */}
      <Button
        onClick={handleShield}
        loading={loading}
        disabled={!connected || parsed <= 0}
        size="lg"
        className="w-full"
      >
        {connected
          ? parsed > 0 ? `Shield ${parsed} SOL →` : "Enter an amount"
          : "Connect Wallet to Shield"}
      </Button>
    </div>
  );
}
