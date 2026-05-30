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
import { useToast } from "@/hooks/useToast";
import type { TxRecord, ProofData, Note, ToastType } from "@/types";

const TABS = [
  { id: "shield", label: "Shield" },
  { id: "withdraw", label: "Withdraw" },
  { id: "history", label: "History" },
  { id: "proof", label: "Proof" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("shield");
  const [note, setNote] = useState<Note | null>(null);
  const [txHistory, setTxHistory] = useState<TxRecord[]>([]);
  const [lastProof, setLastProof] = useState<ProofData | null>(null);
  const { toasts, toast, dismiss } = useToast();

  function handleToast(msg: string, type: ToastType) {
    toast(msg, type);
  }

  function handleShielded(newNote: string) {
    setNote(newNote);
    setTxHistory((prev) => [
      {
        signature: "pending-" + Date.now(),
        type: "shield",
        amount: 0,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
    setActiveTab("withdraw");
  }

  function handleWithdrawn(sig: string) {
    setTxHistory((prev) => [
      {
        signature: sig,
        type: "withdraw",
        amount: 0,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
    setActiveTab("history");
  }

  return (
    <div className="min-h-screen bg-[#080b14]">
      <DevnetBanner />
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <BalanceCard note={note} />

        <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

        <div className="rounded-2xl border border-[#1e293b] bg-[#111827] p-6">
          {activeTab === "shield" && (
            <ShieldPanel onShielded={handleShielded} onToast={handleToast} />
          )}
          {activeTab === "withdraw" && (
            <WithdrawPanel
              onToast={handleToast}
              onWithdrawn={handleWithdrawn}
            />
          )}
          {activeTab === "history" && <HistoryPanel txs={txHistory} />}
          {activeTab === "proof" && (
            <div className="space-y-6">
              <MerkleTreeViz depth={3} />
              <ProofBox proof={lastProof} />
            </div>
          )}
        </div>
      </main>

      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
