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
          className="text-lg font-bold text-[#0f1a16] mb-1"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Settings
        </h2>
        <p className="text-sm text-[#5e8a83]">Network info, note management, and session.</p>
      </div>

      {/* Network */}
      <section className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#5e8a83]">Network</p>
        <div className="rounded-xl  bg-[#f7fbf9] divide-y divide-[#e6f0ed]">
          {/* Network label */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-[#8db5ae]">Network</span>
            <span
              className="px-2.5 py-1 text-xs rounded-full bg-[#599F8A]/10 border border-[#599F8A]/25 text-[#599F8A] font-medium"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {NETWORK_LABEL}
            </span>
          </div>

          {/* RPC endpoint */}
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-sm text-[#8db5ae] flex-shrink-0">RPC</span>
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="text-xs text-[#5e8a83] truncate max-w-[180px] sm:max-w-[240px]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {DEVNET_RPC_URL}
              </span>
              <button
                onClick={() => copyText(DEVNET_RPC_URL, setRpcCopied)}
                className="flex-shrink-0 px-2.5 py-1 text-xs  text-[#5e8a83] rounded-lg hover:border-[#d0e8e1] hover:text-[#8db5ae] transition-all"
              >
                {rpcCopied ? "✓" : "Copy"}
              </button>
            </div>
          </div>

          {/* Program ID — only show when set */}
          {PROGRAM_ID && (
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="text-sm text-[#8db5ae] flex-shrink-0">Program</span>
              <span
                className="text-xs text-[#5e8a83]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {shortenAddress(PROGRAM_ID, 8)}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Private Note */}
      <section className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#5e8a83]">Private Note</p>

        {note ? (
          <div className="rounded-xl  bg-[#f7fbf9] p-4 space-y-3">
            <code
              className="text-xs text-[#599F8A] break-all leading-relaxed block"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {note.length > 88 ? note.slice(0, 88) + "…" : note}
            </code>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => copyText(note, setNoteCopied)}
                className="px-3 py-1.5 text-xs  text-[#8db5ae] rounded-lg hover:border-[#d0e8e1] hover:text-[#0f1a16] transition-all"
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
          <div className="rounded-xl  bg-[#f7fbf9] px-4 py-4">
            <p className="text-sm text-[#8db5ae]">
              No active note.{" "}
              <span className="text-[#8db5ae]">Shield SOL to create one.</span>
            </p>
          </div>
        )}
      </section>

      {/* Session */}
      <section className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#5e8a83]">Session</p>
        <div className="rounded-xl  bg-[#f7fbf9] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#8db5ae]">
                {connected ? "Wallet connected" : "No wallet connected"}
              </p>
              {publicKey && (
                <p
                  className="text-xs text-[#5e8a83] mt-0.5"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
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
      <div className="rounded-xl bg-[#f7fbf9] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#8db5ae]" style={{ fontFamily: "var(--font-raleway)" }}>
            Obscura — devnet demo
          </p>
          <p className="text-xs text-white/[0.18] mt-0.5">
            All funds are testnet SOL with no real value.
          </p>
        </div>
        <a
          href="https://explorer.solana.com/?cluster=devnet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#8db5ae] hover:text-[#599F8A] transition-colors flex-shrink-0"
        >
          Explorer ↗
        </a>
      </div>
    </div>
  );
}
