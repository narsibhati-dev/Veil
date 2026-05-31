"use client";

import { motion } from "motion/react";
import LogoIcon from "@/components/ui/LogoIcon";

const CARD_SHADOW =
  "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)]";
const PRIMARY_SHADOW =
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04)]";
const TAP = { scale: 0.97, transition: { type: "spring" as const, stiffness: 500, damping: 20 } };

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LogoIcon size={32} />
          <span
            className="text-lg font-extrabold text-[#0f1a16] tracking-tight"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Veil
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-[#5e8a83] hover:text-[#0f1a16] transition-colors">
            How it works
          </a>
          <a href="#privacy" className="text-sm text-[#5e8a83] hover:text-[#0f1a16] transition-colors">
            Privacy
          </a>
          <a href="#tech" className="text-sm text-[#5e8a83] hover:text-[#0f1a16] transition-colors">
            Tech Stack
          </a>
        </div>

        <motion.a
          href="/app"
          whileTap={TAP}
          className={`px-4 py-2 rounded-[12px] border border-[#3d7a68] bg-[#599F8A] hover:bg-[#4d8f7a] text-white text-sm font-semibold transition-colors cursor-pointer ${PRIMARY_SHADOW} ${CARD_SHADOW}`}
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Launch App
        </motion.a>
      </div>
    </nav>
  );
}
