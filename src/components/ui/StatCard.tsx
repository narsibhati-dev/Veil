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
      className={`rounded-2xl border border-[#1e1e3a] bg-[#0f0f1a] p-5 transition-shadow ${
        glow ? "shadow-[0_0_24px_rgba(99,102,241,0.08)]" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs uppercase tracking-widest text-[#475569]"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          {label}
        </span>
        {icon && <span className="text-[#6366f1] opacity-40">{icon}</span>}
      </div>
      <div
        className="text-2xl font-bold text-[#f1f5f9] tabular-nums"
        style={{ fontFamily: "var(--font-space-mono)" }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-xs text-[#334155] mt-1.5">{sub}</div>
      )}
    </div>
  );
}
