"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const GLOSSY_SHADOW = [
  "inset_0_1px_0_0_rgba(255,255,255,0.6)",
  "inset_1px_0_0_0_rgba(255,255,255,0.3)",
  "inset_-1px_0_0_0_rgba(255,255,255,0.3)",
  "inset_4px_4px_0_0_rgba(255,255,255,0.06)",
  "inset_-4px_-4px_0_0_rgba(255,255,255,0.06)",
  "inset_6px_6px_0_0_rgba(255,255,255,0.04)",
  "inset_-6px_-6px_0_0_rgba(255,255,255,0.04)",
  "inset_8px_8px_0_0_rgba(255,255,255,0.02)",
  "inset_-8px_-8px_0_0_rgba(255,255,255,0.02)",
  "0_1px_2px_0_rgba(0,0,0,0.08)",
  "0_2px_4px_0_rgba(0,0,0,0.06)",
  "0_4px_6px_0_rgba(0,0,0,0.04)",
  "0_6px_8px_0_rgba(0,0,0,0.02)",
  "0_2px_1px_0_rgba(0,0,0,0.04)",
].join(",");

export default function Button({
  variant = "primary",
  size = "md",
  loading,
  disabled,
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const prefersReduced = useReducedMotion();

  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#599F8A]/70 focus-visible:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed select-none";

  const variants: Record<string, string> = {
    primary:
      `border border-[#3d7a68] bg-[#599F8A] hover:bg-[#4d8f7a] text-white shadow-[${GLOSSY_SHADOW}]`,
    secondary:
      `bg-white hover:bg-[#f0f8f5] text-[#5e8a83] hover:text-[#599F8A] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] transition-colors`,
    ghost:
      "text-[#5e8a83] hover:text-[#599F8A] hover:bg-[#f0f8f5] rounded-xl",
    danger:
      "border border-red-700/50 bg-red-950/40 text-red-400 hover:bg-red-950/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
  };

  const sizes: Record<string, string> = {
    sm: "gap-1.5 px-3 py-1.5 text-xs",
    md: "gap-2 px-4 py-2.5 text-sm",
    lg: "gap-2.5 px-6 py-3.5 text-base",
  };

  return (
    <motion.button
      whileTap={prefersReduced ? undefined : { scale: 0.97, transition: { type: "spring", stiffness: 500, damping: 20 } }}
      whileHover={prefersReduced ? undefined : { scale: 1.01 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...(props as object)}
    >
      {loading && (
        <svg
          aria-hidden="true"
          className="animate-spin -ml-0.5 mr-2 h-4 w-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
