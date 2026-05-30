"use client";

import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0f] disabled:opacity-40 disabled:cursor-not-allowed select-none";

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white hover:from-[#4f51d8] hover:to-[#6366f1] focus:ring-[#6366f1] shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]",
    secondary:
      "bg-[#161626] border border-[#2d2d5e] text-[#94a3b8] hover:border-[#6366f1]/50 hover:text-[#f1f5f9] focus:ring-[#2d2d5e]",
    ghost:
      "text-[#475569] hover:text-[#94a3b8] hover:bg-[#161626] focus:ring-[#2d2d5e]",
    danger:
      "bg-red-950/40 border border-red-700/50 text-red-400 hover:bg-red-950/60 focus:ring-red-700",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-0.5 mr-2 h-4 w-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
