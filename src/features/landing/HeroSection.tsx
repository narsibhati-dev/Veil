"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const CARD_SHADOW =
  "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)]";
const PRIMARY_SHADOW =
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04)]";
const TAP = { scale: 0.97, transition: { type: "spring" as const, stiffness: 500, damping: 20 } };

export default function HeroSection() {
  return (
    <section id="main-content" className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[10px] uppercase tracking-widest font-mono text-[#599F8A] mb-8 ${CARD_SHADOW}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#599F8A] animate-pulse" />
        Zero-Knowledge Privacy on Solana
      </div>

      <h1
        className="text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[1.08] tracking-tight text-[#0f1a16] max-w-3xl mx-auto mb-6"
        style={{ fontFamily: "var(--font-raleway)" }}
      >
        Shield every transfer.<br />Leave zero trace.
      </h1>

      <p className="text-base text-[#5e8a83] max-w-lg mx-auto mb-10 leading-relaxed">
        Deposit SOL anonymously into a shielded cryptographic pool. Generate Groth16
        zero-knowledge proofs completely in-browser. Withdraw to any address with zero on-chain link.
      </p>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <motion.a
          href="/app"
          whileTap={TAP}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-[12px] border border-[#3d7a68] bg-[#599F8A] hover:bg-[#4d8f7a] text-white font-semibold text-sm transition-colors cursor-pointer ${PRIMARY_SHADOW}`}
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Start Shielding <ArrowRight size={15} />
        </motion.a>
        <motion.a
          href="#how-it-works"
          whileTap={TAP}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-[12px] bg-white text-[#5e8a83] hover:text-[#599F8A] hover:bg-[#f0f8f5] font-semibold text-sm transition-colors cursor-pointer ${CARD_SHADOW}`}
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          How it works
        </motion.a>
      </div>
    </section>
  );
}
