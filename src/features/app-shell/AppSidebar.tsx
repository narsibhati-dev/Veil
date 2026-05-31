"use client";

import { Lock, ArrowUpRight, Clock, GitBranch, Settings, Wallet, ShieldCheck } from "lucide-react";

export type Tab = "shield" | "withdraw" | "history" | "proof" | "settings";

export const TABS: { id: Tab; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "shield",   label: "Shield",   icon: Lock,         desc: "Deposit SOL"    },
  { id: "withdraw", label: "Withdraw", icon: ArrowUpRight, desc: "Private payout" },
  { id: "history",  label: "History",  icon: Clock,        desc: "Transactions"   },
  { id: "proof",    label: "Proof",    icon: GitBranch,    desc: "ZK circuit"     },
  { id: "settings", label: "Settings", icon: Settings,     desc: "Network & keys" },
];

const CARD = "rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.05),0_2px_8px_0px_rgba(0,0,0,0.04)]";

interface AppSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  return (
    <nav data-testid="app-sidebar" className={`${CARD} w-52 flex-shrink-0 p-2`} aria-label="App navigation">
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
              data-testid={`tab-${tab.id}`}
              aria-selected={isActive}
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
                  isActive ? "bg-[#599F8A] text-white" : "bg-[#f0f7f4] text-[#8db5ae]"
                }`}
              >
                <Icon size={13} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-sm font-semibold leading-none ${isActive ? "text-[#599F8A]" : "text-[#0f1a16]"}`}
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  {tab.label}
                </p>
                <p className="text-[10px] text-[#8db5ae] mt-0.5 truncate">{tab.desc}</p>
              </div>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#599F8A] flex-shrink-0" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-2 mx-1 px-3 py-2.5 rounded-xl bg-[#f7fbf9] border border-[#e6f0ed]">
        <div className="flex items-center gap-1.5 mb-1">
          <ShieldCheck size={11} className="text-[#599F8A]" />
          <span className="text-[10px] font-semibold text-[#5e8a83]">Devnet</span>
        </div>
        <p className="text-[10px] text-[#8db5ae] leading-relaxed">Test funds only — no real value.</p>
      </div>
    </nav>
  );
}
