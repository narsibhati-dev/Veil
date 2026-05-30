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
  onShielded: (note: string) => void;
  onToast: (msg: string, type: ToastType) => void;
}

export default function ShieldPanel({ onShielded, onToast }: ShieldPanelProps) {
  const { connected } = useWallet();
  const { shield, loading, result, reset } = useShield();
  const [amount, setAmount] = useState("0.1");
  const [confirmed, setConfirmed] = useState(false);

  async function handleShield() {
    const lamports = solToLamports(parseFloat(amount));
    if (lamports <= 0) return;
    try {
      const res = await shield(lamports);
      onToast("SOL shielded! Save your note.", "success");
      onShielded(res.note);
    } catch (e) {
      onToast(e instanceof Error ? e.message : "Shield failed", "error");
    }
  }

  if (result && !confirmed) {
    return (
      <NoteDisplay
        note={result.note}
        signature={result.signature}
        onConfirm={() => {
          setConfirmed(true);
          reset();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-[#94a3b8] mb-2">
          Amount (SOL)
        </label>
        <div className="flex gap-2 mb-3 flex-wrap">
          {PRESETS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                amount === String(a)
                  ? "bg-[#00d4a0]/10 border-[#00d4a0] text-[#00d4a0]"
                  : "bg-[#0f1629] border-[#1e293b] text-[#475569] hover:border-[#334155] hover:text-[#94a3b8]"
              }`}
            >
              {a} SOL
            </button>
          ))}
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          className="w-full bg-[#0f1629] border border-[#1e293b] rounded-lg px-4 py-3 text-[#f1f5f9] focus:outline-none focus:border-[#00d4a0] transition-colors"
          placeholder="0.1"
        />
      </div>

      <div className="rounded-lg border border-[#1e293b] bg-[#0f1629] p-4 text-sm space-y-2">
        <div className="flex justify-between text-[#475569]">
          <span>Amount</span>
          <span className="text-[#94a3b8]">{amount || "0"} SOL</span>
        </div>
        <div className="flex justify-between text-[#475569]">
          <span>Protocol fee</span>
          <span className="text-[#94a3b8]">~0.001 SOL</span>
        </div>
        <div className="border-t border-[#1e293b] pt-2 text-[#475569] text-xs">
          Commitment added to Merkle tree — private by default
        </div>
      </div>

      <Button
        onClick={handleShield}
        loading={loading}
        disabled={!connected || !amount || parseFloat(amount) <= 0}
        size="lg"
        className="w-full"
      >
        {connected ? "Shield SOL" : "Connect Wallet First"}
      </Button>
    </div>
  );
}
