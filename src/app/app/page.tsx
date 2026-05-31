"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopBar        from "@/components/layout/TopBar";
import DevnetBanner  from "@/components/layout/DevnetBanner";
import Toast         from "@/components/ui/Toast";
import BalanceCard   from "@/components/wallet/BalanceCard";
import AppSidebar    from "@/features/app-shell/AppSidebar";
import AppContentCard from "@/features/app-shell/AppContentCard";
import ShieldPanel   from "@/features/shield/ShieldPanel";
import WithdrawPanel from "@/features/withdraw/WithdrawPanel";
import HistoryPanel  from "@/features/history/HistoryPanel";
import MerkleTreeViz from "@/features/proof/MerkleTreeViz";
import ProofBox      from "@/features/proof/ProofBox";
import SettingsPanel from "@/features/settings/SettingsPanel";
import { useToast }  from "@/hooks/useToast";
import { usePrivateBalance } from "@/hooks/usePrivateBalance";
import { clearPrivacyPoolCache } from "@/lib/privacyCash";
import type { TxRecord, ProofData, Note, ToastType } from "@/types";
import type { Tab } from "@/features/app-shell/AppSidebar";

function AppPageInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const activeTab    = (searchParams.get("tab") as Tab | null) ?? "shield";

  function setActiveTab(tab: Tab) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const [note,      setNote]      = useState<Note | null>(null);
  const [txHistory, setTxHistory] = useState<TxRecord[]>([]);
  const [lastProof, setLastProof] = useState<ProofData | null>(null);
  const { toasts, toast, dismiss } = useToast();
  const { balance, loading: balanceLoading, refresh: refreshBalance, setBalance: setPrivateBalance } = usePrivateBalance(note);

  // Rehydrate on mount
  useEffect(() => {
    const savedNote    = localStorage.getItem("veil_note");
    const savedHistory = localStorage.getItem("veil_tx_history");
    if (savedNote) setNote(savedNote);
    if (savedHistory) { try { setTxHistory(JSON.parse(savedHistory)); } catch {} }
  }, []);

  // Persist note
  useEffect(() => {
    if (note) localStorage.setItem("veil_note", note);
    else localStorage.removeItem("veil_note");
  }, [note]);

  // Persist history
  useEffect(() => {
    if (txHistory.length > 0)
      localStorage.setItem("veil_tx_history", JSON.stringify(txHistory));
    else
      localStorage.removeItem("veil_tx_history");
  }, [txHistory]);

  function handleToast(msg: string, type: ToastType) { toast(msg, type); }

  function handleShielded(newNote: string, amount: number, sig: string) {
    setNote(newNote);
    setTxHistory((prev) => [{ signature: sig, type: "shield", amount, timestamp: Date.now() }, ...prev]);
    setActiveTab("withdraw");
    // Optimistic update so balance shows instantly; note change also triggers auto-refresh
    setPrivateBalance((prev) => (prev ?? 0) + amount);
  }

  function handleWithdrawn(sig: string, amount: number) {
    setTxHistory((prev) => [{ signature: sig, type: "withdraw", amount, timestamp: Date.now() }, ...prev]);
    setActiveTab("history");
    // Optimistic update; explicit refresh since note doesn't change after a withdrawal
    setPrivateBalance((prev) => (prev !== null ? Math.max(0, prev - amount) : null));
    refreshBalance();
  }

  function handleProof(proof: ProofData) {
    setLastProof(proof);
    setActiveTab("proof");
  }

  function handleClearNote() {
    setNote(null);
    setLastProof(null);
    clearPrivacyPoolCache();
    toast("Session cleared.", "info");
  }

  return (
    <div className="min-h-screen bg-[#f2f8f5]">
      <DevnetBanner />
      <TopBar />

      <main id="main-content" className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <BalanceCard note={note} balance={balance} balanceLoading={balanceLoading} />

        <div className="flex gap-4 items-start">
          <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <AppContentCard activeTab={activeTab}>
            {activeTab === "shield" && (
              <ShieldPanel onShielded={handleShielded} onToast={handleToast} />
            )}
            {activeTab === "withdraw" && (
              <WithdrawPanel note={note} onToast={handleToast} onWithdrawn={handleWithdrawn} onProof={handleProof} />
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
          </AppContentCard>
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
