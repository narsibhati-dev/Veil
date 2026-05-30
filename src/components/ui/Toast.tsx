"use client";

import type { ToastMessage } from "@/types";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const leftBorder: Record<string, string> = {
  success: "border-l-[#10b981]",
  error:   "border-l-red-500",
  info:    "border-l-[#6366f1]",
  warning: "border-l-amber-400",
};

const dotColor: Record<string, string> = {
  success: "bg-[#10b981]",
  error:   "bg-red-500",
  info:    "bg-[#6366f1]",
  warning: "bg-amber-400",
};

export default function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 px-4 py-3 bg-[#0f0f1a] border-l-[3px] border border-[#1e1e3a] rounded-xl shadow-2xl max-w-sm pointer-events-auto ${leftBorder[t.type]}`}
          style={{ animation: "slideIn 0.2s ease-out" }}
        >
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotColor[t.type]}`} />
          <span className="text-sm text-[#94a3b8] flex-1 leading-relaxed">{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            className="text-[#334155] hover:text-[#475569] flex-shrink-0 mt-0.5 text-xs transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
