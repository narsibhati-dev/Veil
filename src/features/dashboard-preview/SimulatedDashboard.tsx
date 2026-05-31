"use client";

import { useState, useEffect } from "react";
import { Lock, History, Cpu, ShieldCheck, Wallet } from "lucide-react";
import LogoIcon from "@/components/ui/LogoIcon";
import ShieldTab from "./ShieldTab";
import WithdrawTab from "./WithdrawTab";
import HistoryTab from "./HistoryTab";
import ProofsTab from "./ProofsTab";

type MockTab = "shield" | "withdraw" | "history" | "proofs";

const PRIMARY =
  "border border-[#3d7a68] bg-[#599F8A] hover:bg-[#4d8f7a] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),0_1px_2px_0_rgba(0,0,0,0.12),0_2px_4px_0_rgba(0,0,0,0.08)]";

const TABS = [
  { id: "shield",   label: "Shield SOL",      icon: Lock        },
  { id: "withdraw", label: "Private Withdraw", icon: ShieldCheck },
  { id: "history",  label: "Transaction Logs", icon: History     },
  { id: "proofs",   label: "ZK Circuit Logs",  icon: Cpu         },
] as const;

export default function SimulatedDashboard() {
  const [activeTab,     setActiveTab]     = useState<MockTab>("shield");
  const [depositAmount, setDepositAmount] = useState(10);
  const [isGenerating,  setIsGenerating]  = useState(false);
  const [commitment,    setCommitment]    = useState("0x8b3af...9f2e");
  const [secret,        setSecret]        = useState("veil-10sol-8af2...6c1d");
  const [step,          setStep]          = useState(0);

  useEffect(() => {
    const hex = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setCommitment(`0x${hex.slice(0, 6)}...${hex.slice(-4)}`);
    setSecret(`veil-${depositAmount}sol-${hex.slice(0, 10)}...${hex.slice(-6)}`);
  }, [depositAmount]);

  function triggerShield() {
    if (isGenerating) return;
    setIsGenerating(true);
    setStep(1);
    setTimeout(() => setStep(2), 1200);
    setTimeout(() => setStep(3), 2400);
    setTimeout(() => { setStep(4); setIsGenerating(false); }, 3800);
  }

  return (
    <div className="w-full rounded-[28px] glass-card overflow-hidden" style={{ minWidth: 0 }}>

      {/* Header */}
      <div className="px-8 py-5 border-b border-white/[0.06] flex flex-row items-center justify-between gap-4 flex-nowrap overflow-hidden">
        <div className="flex items-center gap-3">
          <LogoIcon size={40} />
          <span
            className="text-lg font-extrabold text-[#e8f5f2] tracking-wider uppercase"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Veil{" "}
            <span className="text-xs font-mono font-normal tracking-normal text-[#6db5a0]/80 lowercase bg-[#599F8A]/10 border border-[#599F8A]/20 px-2 py-0.5 rounded ml-1">
              v1.0-dev
            </span>
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-3 text-sm font-mono">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.07] text-[#8ecabb]">
            <Wallet size={14} className="text-[#6db5a0]" />
            <span className="text-[#6db5a0]/60 uppercase text-xs">Balance:</span>
            <span className="font-bold text-[#e8f5f2]">1,248.50 SOL</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.07] text-[#8ecabb]">
            <span className="w-2 h-2 rounded-full bg-[#6db5a0] shadow-[0_0_6px_#6db5a0] animate-pulse" />
            <span className="text-[#6db5a0]/60 uppercase text-xs">Tier:</span>
            <span className="font-bold text-[#e8f5f2]">GOLD TIER <span className="text-[#6db5a0]">(9.4K PTS)</span></span>
          </div>
          <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${PRIMARY}`}>
            Add Funds
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 border-b border-white/[0.06] flex items-center overflow-x-auto gap-1">
        {TABS.map((tab) => {
          const Icon     = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MockTab)}
              className={`px-6 py-5 border-b-2 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "border-[#599F8A] text-[#8ecabb]"
                  : "border-transparent text-[#6db5a0]/50 hover:text-[#8ecabb]/80"
              }`}
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              <Icon size={16} className={isActive ? "text-[#6db5a0]" : "text-[#6db5a0]/40"} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel body */}
      <div className="p-8 md:p-10 h-[520px] overflow-hidden">
        {activeTab === "shield"   && (
          <ShieldTab
            depositAmount={depositAmount}
            setDepositAmount={setDepositAmount}
            isGenerating={isGenerating}
            step={step}
            commitment={commitment}
            secret={secret}
            onShield={triggerShield}
          />
        )}
        {activeTab === "withdraw" && <WithdrawTab />}
        {activeTab === "history"  && <HistoryTab />}
        {activeTab === "proofs"   && <ProofsTab />}
      </div>
    </div>
  );
}
