"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock, ArrowUpRight, Clock, GitBranch, Settings,
  ShieldCheck, Wallet,
} from "lucide-react";
import TopBar    from "@/components/layout/TopBar";
import DevnetBanner from "@/components/layout/DevnetBanner";
import Toast     from "@/components/ui/Toast";
import BalanceCard   from "@/components/wallet/BalanceCard";
import ShieldPanel   from "@/components/shield/ShieldPanel";
import WithdrawPanel from "@/components/withdraw/WithdrawPanel";
import HistoryPanel  from "@/components/history/HistoryPanel";
import MerkleTreeViz from "@/components/proof/MerkleTreeViz";
import ProofBox      from "@/components/proof/ProofBox";
import SettingsPanel from "@/components/settings/SettingsPanel";
import { useToast }  from "@/hooks/useToast";
import type { TxRecord, ProofData, Note, ToastType } from "@/types";

type Tab = "shield" | "withdraw" | "history" | "proof" | "settings";

const TABS: { id: Tab; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "shield",   label: "Shield",   icon: Lock,         desc: "Deposit SOL"     },
  { id: "withdraw", label: "Withdraw", icon: ArrowUpRight, desc: "Private payout"  },
  { id: "history",  label: "History",  icon: Clock,        desc: "Transactions"    },
  { id: "proof",    label: "Proof",    icon: GitBranch,    desc: "ZK circuit"      },
  { id: "settings", label: "Settings", icon: Settings,     desc: "Network & keys"  },
];

const CARD = "rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.05),0_2px_8px_0px_rgba(0,0,0,0.04)]";

function AppPageInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const activeTab    = (searchParams.get("tab") as Tab | null) ?? "shield";

  function setActiveTab(tab: Tab) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const [note, setNote]           = useState<Note | null>(null);
  const [txHistory, setTxHistory] = useState<TxRecord[]>([]);
  const [lastProof, setLastProof] = useState<ProofData | null>(null);
  const { toasts, toast, dismiss } = useToast();

  function handleToast(msg: string, type: ToastType) { toast(msg, type); }

  function handleShielded(newNote: string, amount: number, sig: string) {
    setNote(newNote);
    setTxHistory((prev) => [
      { signature: sig, type: "shield", amount, timestamp: Date.now() },
      ...prev,
    ]);
    setActiveTab("withdraw");
  }

  function handleWithdrawn(sig: string) {
    const match  = note?.match(/^veil-([0-9.]+)sol-/);
    const sol    = match ? parseFloat(match[1]) : 0;
    const amount = sol ? Math.round(sol * 1_000_000_000) : 0;
    setTxHistory((prev) => [
      { signature: sig, type: "withdraw", amount, timestamp: Date.now() },
      ...prev,
    ]);
    setActiveTab("history");
  }

  function handleProof(proof: ProofData) {
    setLastProof(proof);
    setActiveTab("proof");
  }

  function handleClearNote() {
    setNote(null);
    setLastProof(null);
    toast("Note cleared. Balance reset.", "info");
  }

  const activeTabMeta = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-[#f2f8f5]">
      <DevnetBanner />
      <TopBar />

      <main id="main-content" className="max-w-5xl mx-auto px-4 py-6 space-y-4">

        {/* ── Balance Card ── */}
        <BalanceCard note={note} />

        {/* ── Two-column card layout ── */}
        <div className="flex gap-4 items-start">

          {/* ── Sidebar navigation card ── */}
          <nav
            className={`${CARD} w-52 flex-shrink-0 p-2`}
            aria-label="App navigation"
          >
            {/* Wallet section header */}
            <div className="px-3 pt-2 pb-3 mb-1 border-b border-[#f0f7f4]">
              <div className="flex items-center gap-2">
                <Wallet size={12} className="text-[#8db5ae]" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8db5ae]">
                  Privacy Pool
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              {TABS.map((tab) => {
                const Icon     = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={[
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/60",
                      isActive
                        ? "bg-[#f0f8f5] text-[#599F8A]"
                        : "text-[#5e8a83] hover:bg-[#f7fbf9] hover:text-[#0f1a16]",
                    ].join(" ")}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#599F8A] text-white"
                          : "bg-[#f0f7f4] text-[#8db5ae]"
                      }`}
                    >
                      <Icon size={13} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold leading-none ${
                          isActive ? "text-[#599F8A]" : "text-[#0f1a16]"
                        }`}
                        style={{ fontFamily: "var(--font-raleway)" }}
                      >
                        {tab.label}
                      </p>
                      <p className="text-[10px] text-[#8db5ae] mt-0.5 truncate">
                        {tab.desc}
                      </p>
                    </div>
                    {isActive && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-[#599F8A] flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Devnet note at bottom */}
            <div className="mt-2 mx-1 px-3 py-2.5 rounded-xl bg-[#f7fbf9] border border-[#e6f0ed]">
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck size={11} className="text-[#599F8A]" />
                <span className="text-[10px] font-semibold text-[#5e8a83]">Devnet</span>
              </div>
              <p className="text-[10px] text-[#8db5ae] leading-relaxed">
                Test funds only — no real value.
              </p>
            </div>
          </nav>

          {/* ── Content card ── */}
          <div className="flex-1 min-w-0">
            <div className={`${CARD} overflow-hidden`}>

              {/* Card header */}
              <div className="px-6 py-4 border-b border-[#f0f7f4] flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#f0f8f5] flex items-center justify-center flex-shrink-0">
                  <activeTabMeta.icon size={14} className="text-[#599F8A]" aria-hidden="true" />
                </div>
                <div>
                  <h1
                    className="text-sm font-bold text-[#0f1a16] leading-none"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {activeTabMeta.label}
                  </h1>
                  <p className="text-[11px] text-[#8db5ae] mt-0.5">{activeTabMeta.desc}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                {activeTab === "shield" && (
                  <ShieldPanel onShielded={handleShielded} onToast={handleToast} />
                )}
                {activeTab === "withdraw" && (
                  <WithdrawPanel
                    onToast={handleToast}
                    onWithdrawn={handleWithdrawn}
                    onProof={handleProof}
                  />
                )}
                {activeTab === "history" && <HistoryPanel txs={txHistory} />}
                {activeTab === "proof" && (
                  <div className="space-y-6">
                    <MerkleTreeViz depth={4} />
                    <ProofBox proof={lastProof} />
                  </div>
                )}
                {activeTab === "settings" && (
                  <SettingsPanel note={note} onClearNote={handleClearNote} />
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense>
      <AppPageInner />
    </Suspense>
  );
}
