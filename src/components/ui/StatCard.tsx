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
      className={`rounded-xl border border-[#1e293b] bg-[#111827] p-4 ${
        glow ? "shadow-[0_0_20px_rgba(0,212,160,0.1)]" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#475569] uppercase tracking-wider">
          {label}
        </span>
        {icon && <span className="text-[#00d4a0] opacity-60">{icon}</span>}
      </div>
      <div className="text-2xl font-bold text-[#f1f5f9]">{value}</div>
      {sub && <div className="text-xs text-[#475569] mt-1">{sub}</div>}
    </div>
  );
}
