"use client";

import type { ToastMessage } from "@/types";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const icons: Record<string, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  warning: "⚠",
};

const styles: Record<string, string> = {
  success: "border-[#00d4a0] text-[#00d4a0]",
  error: "border-red-500 text-red-400",
  info: "border-blue-500 text-blue-400",
  warning: "border-yellow-500 text-yellow-400",
};

export default function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 bg-[#111827] border rounded-lg shadow-xl max-w-sm text-sm ${styles[t.type]}`}
        >
          <span className="font-bold">{icons[t.type]}</span>
          <span className="text-[#f1f5f9] flex-1">{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            className="text-[#475569] hover:text-[#94a3b8] ml-2"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
