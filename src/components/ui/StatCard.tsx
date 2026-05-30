import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon?: ReactNode;
  glow?: boolean;
}

export default function StatCard({ label, value, sub, icon, glow }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl  bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] p-5 transition-shadow ${
        glow ? "shadow-[0_0_24px_rgba(89,159,138,0.08)]" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs uppercase tracking-widest text-[#5e8a83]"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          {label}
        </span>
        {icon && <span className="text-[#599F8A] opacity-40">{icon}</span>}
      </div>
      <div
        className="text-2xl font-bold text-[#0f1a16] tabular-nums"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-xs text-[#8db5ae] mt-1.5">{sub}</div>
      )}
    </div>
  );
}
