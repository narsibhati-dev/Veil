"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import DevnetBanner from "@/components/layout/DevnetBanner";
import Tabs from "@/components/ui/Tabs";
import Toast from "@/components/ui/Toast";
import BalanceCard from "@/components/wallet/BalanceCard";
import ShieldPanel from "@/components/shield/ShieldPanel";
import WithdrawPanel from "@/components/withdraw/WithdrawPanel";
import HistoryPanel from "@/components/history/HistoryPanel";
import MerkleTreeViz from "@/components/proof/MerkleTreeViz";
import ProofBox from "@/components/proof/ProofBox";
import SettingsPanel from "@/components/settings/SettingsPanel";
import { useToast } from "@/hooks/useToast";
import type { TxRecord, ProofData, Note, ToastType } from "@/types";

type Tab = "shield" | "withdraw" | "history" | "proof" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "shield",   label: "Shield"   },
  { id: "withdraw", label: "Withdraw" },
  { id: "history",  label: "History"  },
  { id: "proof",    label: "Proof"    },
  { id: "settings", label: "Settings" },
];

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<Tab>("shield");
  const [note, setNote]           = useState<Note | null>(null);
  const [txHistory, setTxHistory] = useState<TxRecord[]>([]);
  const [lastProof, setLastProof] = useState<ProofData | null>(null);
  const { toasts, toast, dismiss } = useToast();

  function handleToast(msg: string, type: ToastType) {
    toast(msg, type);
  }

  function handleShielded(newNote: string, amount: number, sig: string) {
    setNote(newNote);
    setTxHistory((prev) => [
      { signature: sig, type: "shield", amount, timestamp: Date.now() },
      ...prev,
    ]);
    setActiveTab("withdraw");
  }

  function handleWithdrawn(sig: string) {
    // Parse deposited amount from the note so history shows the right value
    const match = note?.match(/^obscura-([0-9.]+)sol-/);
    const sol = match ? parseFloat(match[1]) : 0;
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

  return (
    <div className="min-h-screen bg-white text-[#0f1a16]">
      <DevnetBanner />
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        <BalanceCard note={note} />

        <Tabs
          tabs={TABS}
          active={activeTab}
          onChange={(id) => setActiveTab(id as Tab)}
        />

        {/* Panel card with indigo top edge */}
        <div className="rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_4px_8px_0px_rgba(0,0,0,0.04)] [border-top:2px_solid_#599F8A] bg-white p-6">
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
      </main>

      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
