"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { shortenAddress } from "@/lib/format";

interface NoteDisplayProps {
  note: string;
  signature: string;
  onConfirm: () => void;
}

export default function NoteDisplay({ note, signature, onConfirm }: NoteDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function copy() {
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Warning */}
      <div className="rounded-xl border border-amber-700/40 bg-amber-950/25 p-4">
        <p className="text-amber-400 font-semibold text-sm mb-1.5">
          ⚠ Save this note — it&apos;s the only way to recover funds
        </p>
        <p className="text-amber-700/80 text-xs leading-relaxed">
          This string is your private key to the shielded deposit. It cannot be
          retrieved from the chain. Store it in a password manager or secure file.
        </p>
      </div>

      {/* Note block */}
      <div className="rounded-xl border border-[#1e1e3a] bg-[#161626] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e3a]">
          <span
            className="text-xs text-[#475569] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Private Note
          </span>
          <button
            onClick={copy}
            className="text-xs px-2.5 py-1 rounded-md border border-[#2d2d5e] text-[#94a3b8] hover:text-[#6366f1] hover:border-[#6366f1]/50 transition-all"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <div className="p-4">
          <code
            className="text-[#94a3b8] text-xs break-all leading-relaxed block"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {note}
          </code>
        </div>
      </div>

      {/* Tx link */}
      <div className="text-xs text-[#334155]">
        Transaction:{" "}
        <a
          href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#6366f1] transition-colors"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          {shortenAddress(signature, 10)}
        </a>
      </div>

      {/* Confirmation checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded border transition-all duration-150 flex items-center justify-center ${
              agreed
                ? "bg-[#6366f1] border-[#6366f1]"
                : "bg-[#161626] border-[#2d2d5e] group-hover:border-[#6366f1]/50"
            }`}
          >
            {agreed && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-[#94a3b8] leading-relaxed">
          I&apos;ve saved this note securely. I understand it cannot be recovered if lost.
        </span>
      </label>

      <Button onClick={onConfirm} disabled={!agreed} size="lg" className="w-full">
        Done — Continue to Withdraw →
      </Button>
    </div>
  );
}
