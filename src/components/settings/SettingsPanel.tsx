"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Globe, Key, Wallet, Copy, Check, Trash2, ExternalLink, LogOut } from "lucide-react";
import { DEVNET_RPC_URL, NETWORK_LABEL, PROGRAM_ID } from "@/lib/constants";
import { shortenAddress } from "@/lib/format";
import type { Note } from "@/types";

interface SettingsPanelProps {
  note: Note | null;
  onClearNote: () => void;
}

const CARD = "rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.05),0_2px_8px_0px_rgba(0,0,0,0.04)] overflow-hidden";
const ROW  = "flex items-center justify-between gap-4 px-5 py-3.5";
const DIV  = "border-t border-[#f0f7f4]";

function CopyBtn({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(text);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#8db5ae] hover:text-[#599F8A] hover:bg-[#f0f8f5] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/70 focus-visible:ring-offset-1"
    >
      {done
        ? <><Check size={11} /><span>Copied</span></>
        : <><Copy size={11} /><span>{label}</span></>}
    </button>
  );
}

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-6 h-6 rounded-md bg-[#f0f8f5] flex items-center justify-center">
        <Icon size={13} className="text-[#599F8A]" aria-hidden="true" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-[#5e8a83]">
        {label}
      </span>
    </div>
  );
}

export default function SettingsPanel({ note, onClearNote }: SettingsPanelProps) {
  const { publicKey, disconnect, connected } = useWallet();

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="pb-1">
        <h2
          className="text-lg font-bold text-[#0f1a16] mb-0.5"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Settings
        </h2>
        <p className="text-sm text-[#8db5ae]">Network info, note management, and session.</p>
      </div>

      {/* ── Network ── */}
      <section>
        <SectionHeader icon={Globe} label="Network" />
        <div className={CARD}>
          <div className={ROW}>
            <span className="text-sm text-[#5e8a83]">Network</span>
            <span
              className="px-2.5 py-1 text-xs rounded-full bg-[#599F8A]/8 border border-[#599F8A]/20 text-[#599F8A] font-semibold"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {NETWORK_LABEL}
            </span>
          </div>

          <div className={`${ROW} ${DIV}`}>
            <span className="text-sm text-[#5e8a83] flex-shrink-0">RPC</span>
            <div className="flex items-center gap-1 min-w-0">
              <span
                className="text-xs text-[#8db5ae] truncate max-w-[170px] sm:max-w-[240px]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {DEVNET_RPC_URL}
              </span>
              <CopyBtn text={DEVNET_RPC_URL} />
            </div>
          </div>

          {PROGRAM_ID && (
            <div className={`${ROW} ${DIV}`}>
              <span className="text-sm text-[#5e8a83] flex-shrink-0">Program</span>
              <div className="flex items-center gap-1">
                <span
                  className="text-xs text-[#8db5ae]"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {shortenAddress(PROGRAM_ID, 8)}
                </span>
                <CopyBtn text={PROGRAM_ID} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Private Note ── */}
      <section>
        <SectionHeader icon={Key} label="Private Note" />

        {note ? (
          <div className={CARD}>
            <div className="px-5 pt-4 pb-3">
              <div className="rounded-xl bg-[#f7fbf9] border border-[#e6f0ed] px-4 py-3 mb-3">
                <code
                  className="text-xs text-[#599F8A] break-all leading-[1.7] block"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {note.length > 96 ? note.slice(0, 96) + "…" : note}
                </code>
              </div>
              <div className="flex items-center gap-2">
                <CopyBtn text={note} label="Copy full note" />
                <div className="w-px h-4 bg-[#e6f0ed]" />
                <button
                  onClick={onClearNote}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-500 hover:bg-red-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 focus-visible:ring-offset-1"
                >
                  <Trash2 size={11} aria-hidden="true" />
                  Clear note
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`${CARD} px-5 py-4`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f7fbf9] border border-[#e6f0ed] flex items-center justify-center flex-shrink-0">
                <Key size={14} className="text-[#8db5ae]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-[#5e8a83] font-medium">No active note</p>
                <p className="text-xs text-[#8db5ae] mt-0.5">Shield SOL to create one.</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Session ── */}
      <section>
        <SectionHeader icon={Wallet} label="Session" />
        <div className={CARD}>
          <div className={ROW}>
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  connected ? "bg-[#3ab96b] shadow-[0_0_6px_rgba(58,185,107,0.6)]" : "bg-[#8db5ae]"
                }`}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-sm text-[#0f1a16] font-medium">
                  {connected ? "Wallet connected" : "No wallet connected"}
                </p>
                {publicKey && (
                  <p
                    className="text-xs text-[#8db5ae] mt-0.5 truncate"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {shortenAddress(publicKey.toBase58(), 8)}
                  </p>
                )}
              </div>
            </div>

            {connected && (
              <button
                onClick={() => disconnect()}
                className="inline-flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-400 hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 focus-visible:ring-offset-1"
              >
                <LogOut size={11} aria-hidden="true" />
                Disconnect
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#e6f0ed] bg-[#f7fbf9]">
        <div>
          <p
            className="text-xs font-semibold text-[#5e8a83]"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Veil — devnet demo
          </p>
          <p className="text-xs text-[#8db5ae]/70 mt-0.5">
            All funds are testnet SOL with no real value.
          </p>
        </div>
        <a
          href="https://explorer.solana.com/?cluster=devnet"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#8db5ae] hover:text-[#599F8A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/70 focus-visible:ring-offset-1 rounded flex-shrink-0"
        >
          Explorer <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>

    </div>
  );
}
