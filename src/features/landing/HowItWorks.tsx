"use client";

import { motion } from "motion/react";
import { Shield, Cpu, Zap, ArrowRight } from "lucide-react";

const CARD_SHADOW =
  "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)]";
const CARD_HOVER =
  "hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_2px_8px_-1px_rgba(0,0,0,0.08),0_6px_16px_0px_rgba(0,0,0,0.05)]";
const PRIMARY_SHADOW =
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04)]";
const TAP = { scale: 0.97, transition: { type: "spring" as const, stiffness: 500, damping: 20 } };

const STEPS = [
  {
    step: "01", icon: Shield,
    title: "Shield Funds",
    desc: "Deposit SOL. A Poseidon commitment is computed from a browser-generated secret note and registered as a leaf in the on-chain Merkle tree.",
    badge: "Deposit Stage",
  },
  {
    step: "02", icon: Cpu,
    title: "Generate Proof",
    desc: "A Groth16 zero-knowledge proof is computed locally in WASM, attesting you own a valid note in the Merkle tree without revealing which one.",
    badge: "Proving Stage",
  },
  {
    step: "03", icon: Zap,
    title: "Withdraw Privately",
    desc: "Submit the proof and a one-time nullifier on-chain. Funds are released to any address, blocking double-spends while remaining completely untraceable.",
    badge: "Withdrawal Stage",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full bg-white text-[10px] font-mono text-[#599F8A] uppercase tracking-widest mb-5 ${CARD_SHADOW}`}
        >
          How it works
        </span>
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-[#0f1a16] leading-tight"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Veil shields you in three simple steps.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {STEPS.map(({ step, icon: Icon, title, desc, badge }) => (
          <div
            key={step}
            className={`rounded-2xl bg-white p-6 transition-all duration-200 group ${CARD_SHADOW} ${CARD_HOVER}`}
          >
            <div className="flex items-center justify-between mb-5">
              <span className={`text-xs font-mono font-bold text-[#599F8A] bg-white px-2.5 py-1 rounded-lg ${CARD_SHADOW}`}>
                Step {step}
              </span>
              <Icon size={16} className="text-[#8db5ae] group-hover:text-[#599F8A] transition-colors" />
            </div>
            <h3
              className="text-base font-bold text-[#0f1a16] mb-2"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              {title}
            </h3>
            <p className="text-sm text-[#5e8a83] leading-relaxed mb-5">{desc}</p>
            <span
              className={`text-[9px] font-mono text-[#5e8a83] bg-white px-2 py-0.5 rounded uppercase tracking-wider ${CARD_SHADOW}`}
            >
              {badge}
            </span>
          </div>
        ))}
      </div>

      <div className={`rounded-2xl bg-[#f7fbf9] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${CARD_SHADOW}`}>
        <div>
          <p
            className="text-sm font-bold text-[#0f1a16]"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Discover how Veil makes private transfers simple and verifiable.
          </p>
          <p className="text-xs text-[#5e8a83] mt-1">
            Zero wallet links, zero trace. All proofs verified on-chain.
          </p>
        </div>
        <motion.a
          href="/app"
          whileTap={TAP}
          className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] border border-[#3d7a68] bg-[#599F8A] hover:bg-[#4d8f7a] text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${PRIMARY_SHADOW}`}
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Try the App <ArrowRight size={14} />
        </motion.a>
      </div>
    </section>
  );
}
