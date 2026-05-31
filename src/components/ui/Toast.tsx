"use client";

import type { ToastMessage } from "@/types";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const leftBorder: Record<string, string> = {
  success: "border-l-[#3ab96b]",
  error:   "border-l-red-500",
  info:    "border-l-[#599F8A]",
  warning: "border-l-amber-400",
};

const dotColor: Record<string, string> = {
  success: "bg-[#3ab96b]",
  error:   "bg-red-500",
  info:    "bg-[#599F8A]",
  warning: "bg-amber-400",
};

export default function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-5 right-5 flex flex-col gap-2 z-50 pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          data-testid="toast"
          className={`flex items-start gap-3 px-4 py-3 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] border-l-[3px] rounded-xl max-w-sm pointer-events-auto ${leftBorder[t.type]}`}
          style={{ animation: "slideIn 0.2s ease-out" }}
        >
          <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotColor[t.type]}`} />
          <span className="text-sm text-[#8db5ae] flex-1 min-w-0 leading-relaxed">{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
            className="text-[#8db5ae] hover:text-[#5e8a83] flex-shrink-0 mt-0.5 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/70 focus-visible:ring-offset-1 rounded"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
