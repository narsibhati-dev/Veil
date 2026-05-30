"use client";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="border-b border-[#1e1e3a]">
      <div className="flex gap-0">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative px-5 py-3 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-[#6366f1]"
                  : "text-[#475569] hover:text-[#94a3b8]"
              }`}
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#818cf8] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
