"use client";

import type { ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-[#0f1629] rounded-xl border border-[#1e293b]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1 justify-center
            ${
              active === tab.id
                ? "bg-[#1e293b] text-[#00d4a0] shadow-sm"
                : "text-[#475569] hover:text-[#94a3b8] hover:bg-[#111827]"
            }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
