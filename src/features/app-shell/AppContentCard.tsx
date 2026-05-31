import type { Tab } from "./AppSidebar";
import { TABS } from "./AppSidebar";

const CARD = "rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.05),0_2px_8px_0px_rgba(0,0,0,0.04)]";

interface AppContentCardProps {
  activeTab: Tab;
  children: React.ReactNode;
}

export default function AppContentCard({ activeTab, children }: AppContentCardProps) {
  const meta = TABS.find((t) => t.id === activeTab)!;
  const Icon = meta.icon;

  return (
    <div className="flex-1 min-w-0">
      <div className={`${CARD} overflow-hidden`}>
        <div className="px-6 py-4 border-b border-[#f0f7f4] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#f0f8f5] flex items-center justify-center flex-shrink-0">
            <Icon size={14} className="text-[#599F8A]" aria-hidden="true" />
          </div>
          <div>
            <h1
              className="text-sm font-bold text-[#0f1a16] leading-none"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              {meta.label}
            </h1>
            <p className="text-[11px] text-[#8db5ae] mt-0.5">{meta.desc}</p>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
