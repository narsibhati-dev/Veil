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
    <div className="border-b border-[#e6f0ed]">
      <div className="flex gap-0">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative px-5 py-3 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-[#599F8A]"
                  : "text-[#5e8a83] hover:text-[#8db5ae]"
              }`}
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#599F8A] to-[#6db5a0] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
