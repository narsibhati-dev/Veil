"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { DEVNET_RPC_URL, NETWORK_LABEL, PROGRAM_ID } from "@/lib/constants";
import { shortenAddress } from "@/lib/format";
import type { Note } from "@/types";

interface SettingsPanelProps {
  note: Note | null;
  onClearNote: () => void;
}

export default function SettingsPanel({ note, onClearNote }: SettingsPanelProps) {
  const { publicKey, disconnect, connected } = useWallet();
  const [rpcCopied, setRpcCopied]   = useState(false);
  const [noteCopied, setNoteCopied] = useState(false);

  async function copyText(text: string, setter: (v: boolean) => void) {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          className="text-lg font-bold text-[#f1f5f9] mb-1"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Settings
        </h2>
        <p className="text-sm text-[#475569]">Network info, note management, and session.</p>
      </div>

      {/* Network */}
      <section className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#475569]">Network</p>
        <div className="rounded-xl border border-[#1e1e3a] bg-[#161626] divide-y divide-[#1e1e3a]">
          {/* Network label */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-[#94a3b8]">Network</span>
            <span
              className="px-2.5 py-1 text-xs rounded-full bg-[#6366f1]/10 border border-[#6366f1]/25 text-[#6366f1] font-medium"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {NETWORK_LABEL}
            </span>
          </div>

          {/* RPC endpoint */}
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-sm text-[#94a3b8] flex-shrink-0">RPC</span>
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="text-xs text-[#475569] truncate max-w-[180px] sm:max-w-[240px]"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {DEVNET_RPC_URL}
              </span>
              <button
                onClick={() => copyText(DEVNET_RPC_URL, setRpcCopied)}
                className="flex-shrink-0 px-2.5 py-1 text-xs border border-[#1e1e3a] text-[#475569] rounded-lg hover:border-[#2d2d5e] hover:text-[#94a3b8] transition-all"
              >
                {rpcCopied ? "✓" : "Copy"}
              </button>
            </div>
          </div>

          {/* Program ID — only show when set */}
          {PROGRAM_ID && (
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="text-sm text-[#94a3b8] flex-shrink-0">Program</span>
              <span
                className="text-xs text-[#475569]"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {shortenAddress(PROGRAM_ID, 8)}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Private Note */}
      <section className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#475569]">Private Note</p>

        {note ? (
          <div className="rounded-xl border border-[#1e1e3a] bg-[#161626] p-4 space-y-3">
            <code
              className="text-xs text-[#6366f1] break-all leading-relaxed block"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {note.length > 88 ? note.slice(0, 88) + "…" : note}
            </code>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => copyText(note, setNoteCopied)}
                className="px-3 py-1.5 text-xs border border-[#1e1e3a] text-[#94a3b8] rounded-lg hover:border-[#2d2d5e] hover:text-[#f1f5f9] transition-all"
              >
                {noteCopied ? "Copied ✓" : "Copy full note"}
              </button>
              <button
                onClick={onClearNote}
                className="px-3 py-1.5 text-xs border border-red-800/40 text-red-400/80 rounded-lg hover:bg-red-950/20 hover:text-red-400 transition-all"
              >
                Clear note
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[#1e1e3a] bg-[#161626]/50 px-4 py-4">
            <p className="text-sm text-[#334155]">
              No active note.{" "}
              <span className="text-[#2d2d5e]">Shield SOL to create one.</span>
            </p>
          </div>
        )}
      </section>

      {/* Session */}
      <section className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#475569]">Session</p>
        <div className="rounded-xl border border-[#1e1e3a] bg-[#161626] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#94a3b8]">
                {connected ? "Wallet connected" : "No wallet connected"}
              </p>
              {publicKey && (
                <p
                  className="text-xs text-[#475569] mt-0.5"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {shortenAddress(publicKey.toBase58(), 8)}
                </p>
              )}
            </div>
            {connected && (
              <button
                onClick={() => disconnect()}
                className="flex-shrink-0 px-3 py-1.5 text-xs border border-red-800/40 text-red-400/80 rounded-lg hover:bg-red-950/20 hover:text-red-400 transition-all"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      <div className="rounded-xl border border-[#1e1e3a]/50 bg-[#0f0f1a]/50 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#2d2d5e]" style={{ fontFamily: "var(--font-syne)" }}>
            Obscura — devnet demo
          </p>
          <p className="text-xs text-[#1e1e3a] mt-0.5">
            All funds are testnet SOL with no real value.
          </p>
        </div>
        <a
          href="https://explorer.solana.com/?cluster=devnet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#334155] hover:text-[#6366f1] transition-colors flex-shrink-0"
        >
          Explorer ↗
        </a>
      </div>
    </div>
  );
}
