"use client";

import { useEffect, useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChevronDown, Copy, Check, LogOut, Wallet } from "lucide-react";
import { shortenAddress } from "@/lib/format";

export default function WalletDropdown() {
  const { wallets, select, disconnect, connected, connecting, publicKey, wallet } = useWallet();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Auto-close when wallet connects
  useEffect(() => {
    if (connected) setOpen(false);
  }, [connected]);

  async function copyAddress() {
    if (!publicKey) return;
    await navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative" ref={containerRef}>

      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={[
          "inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-medium transition-all",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/70 focus-visible:ring-offset-1",
          connected
            ? "bg-[#f0f8f5] border border-[#d0e8e1] text-[#0f1a16] hover:bg-[#e6f4ef]"
            : "bg-[#599F8A] text-white hover:bg-[#4d8f7a] shadow-sm",
        ].join(" ")}
      >
        {connecting ? (
          <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
        ) : connected && wallet ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={wallet.adapter.icon} alt="" className="w-4 h-4 rounded-full" aria-hidden="true" />
            <span style={{ fontFamily: "var(--font-jetbrains-mono)" }} className="text-xs">
              {shortenAddress(publicKey!.toBase58(), 4)}
            </span>
          </>
        ) : (
          <>
            <Wallet size={15} aria-hidden="true" />
            <span>Connect</span>
          </>
        )}
        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown card */}
      {open && (
        <div
          role="dialog"
          aria-label={connected ? "Wallet options" : "Connect a wallet"}
          className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white z-50 shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_4px_24px_-4px_rgba(0,0,0,0.14)] overflow-hidden"
        >
          {connected ? (
            /* ── Connected state ── */
            <>
              <div className="px-4 py-3.5 border-b border-[#f0f7f4]">
                <div className="flex items-center gap-2 mb-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={wallet!.adapter.icon} alt="" className="w-5 h-5 rounded-md" aria-hidden="true" />
                  <span className="text-xs font-semibold text-[#0f1a16]">{wallet!.adapter.name}</span>
                  <span
                    className="ml-auto w-2 h-2 rounded-full bg-[#3ab96b] shadow-[0_0_6px_rgba(58,185,107,0.55)]"
                    aria-hidden="true"
                  />
                </div>
                <p
                  className="text-xs text-[#8db5ae] mt-0.5"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {publicKey ? shortenAddress(publicKey.toBase58(), 8) : ""}
                </p>
              </div>

              <div className="p-2">
                <button
                  onClick={copyAddress}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#5e8a83] hover:bg-[#f0f8f5] transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/50"
                >
                  {copied
                    ? <Check size={14} aria-hidden="true" />
                    : <Copy size={14} aria-hidden="true" />}
                  {copied ? "Copied!" : "Copy address"}
                </button>

                <button
                  onClick={() => { disconnect(); setOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-50 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
                >
                  <LogOut size={14} aria-hidden="true" />
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            /* ── Wallet selection ── */
            <>
              <div className="px-4 py-3 border-b border-[#f0f7f4]">
                <p className="text-xs font-semibold text-[#5e8a83] uppercase tracking-widest">
                  Connect a wallet
                </p>
              </div>

              <div className="p-2">
                {wallets.length > 0 ? wallets.map((w) => (
                  <button
                    key={w.adapter.name}
                    onClick={() => { select(w.adapter.name); setOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#0f1a16] hover:bg-[#f0f8f5] transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.adapter.icon}
                      alt=""
                      className="w-7 h-7 rounded-lg"
                      aria-hidden="true"
                    />
                    <span className="font-medium">{w.adapter.name}</span>
                    {w.readyState === "Installed" && (
                      <span className="ml-auto text-[10px] font-semibold text-[#3ab96b] uppercase tracking-wide">
                        Detected
                      </span>
                    )}
                  </button>
                )) : (
                  <div className="px-3 py-5 text-center">
                    <p className="text-xs text-[#8db5ae]">No wallets detected.</p>
                    <p className="text-xs text-[#8db5ae]/70 mt-1">Install Phantom or Solflare.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
