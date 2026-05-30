"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { shortenAddress } from "@/lib/format";

interface NoteDisplayProps {
  note: string;
  signature: string;
  onConfirm: () => void;
}

export default function NoteDisplay({
  note,
  signature,
  onConfirm,
}: NoteDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function copy() {
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-700/50 bg-yellow-900/10 p-4">
        <p className="text-yellow-400 font-semibold text-sm mb-1">
          ⚠ Save this note immediately
        </p>
        <p className="text-yellow-600 text-xs">
          This is the only way to recover your shielded funds. It cannot be
          retrieved later.
        </p>
      </div>

      <div className="rounded-lg bg-[#0f1629] border border-[#1e293b] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#475569] uppercase tracking-wider">
            Private Note
          </span>
          <button
            onClick={copy}
            className="text-xs text-[#00d4a0] hover:text-[#00b88a]"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <code className="text-[#f1f5f9] font-mono text-xs break-all leading-relaxed">
          {note}
        </code>
      </div>

      <div className="text-xs text-[#475569]">
        Tx:{" "}
        <a
          href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00d4a0] hover:underline font-mono"
        >
          {shortenAddress(signature, 8)}
        </a>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 accent-[#00d4a0]"
        />
        <span className="text-sm text-[#94a3b8]">
          I have saved my private note in a secure location
        </span>
      </label>

      <Button
        onClick={onConfirm}
        disabled={!agreed}
        size="lg"
        className="w-full"
      >
        Done — I&apos;ve Saved My Note
      </Button>
    </div>
  );
}
