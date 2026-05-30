"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Shield, Cpu, Zap, ArrowRight, CheckCircle2, Code, Terminal } from "lucide-react";
import SimulatedDashboard from "@/components/layout/SimulatedDashboard";

/* Ring-shadow for cards/secondary elements */
const CARD_SHADOW =
  "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)]";
const CARD_HOVER =
  "hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_2px_8px_-1px_rgba(0,0,0,0.08),0_6px_16px_0px_rgba(0,0,0,0.05)]";

/* Glossy 3D shadow for primary buttons — matches PrimaryButton */
const PRIMARY_SHADOW =
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),inset_4px_4px_0_0_rgba(255,255,255,0.06),inset_-4px_-4px_0_0_rgba(255,255,255,0.06),inset_6px_6px_0_0_rgba(255,255,255,0.04),inset_-6px_-6px_0_0_rgba(255,255,255,0.04),inset_8px_8px_0_0_rgba(255,255,255,0.02),inset_-8px_-8px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_6px_0_rgba(0,0,0,0.04),0_6px_8px_0_rgba(0,0,0,0.02),0_2px_1px_0_rgba(0,0,0,0.04)]";

const TAP = { scale: 0.97, transition: { type: "spring" as const, stiffness: 500, damping: 20 } };

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f1a16] overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="navLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#599F8A" />
                  <stop offset="100%" stopColor="#3d7a68" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="16" stroke="url(#navLogoGrad)" strokeWidth="3" fill="none" />
              <circle cx="20" cy="20" r="9" stroke="url(#navLogoGrad)" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
              <circle cx="20" cy="20" r="3.5" fill="url(#navLogoGrad)" />
            </svg>
            <span className="text-lg font-extrabold text-[#0f1a16] tracking-tight" style={{ fontFamily: "var(--font-raleway)" }}>
              Obscura
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-[#5e8a83] hover:text-[#0f1a16] transition-colors">How it works</a>
            <a href="#privacy" className="text-sm text-[#5e8a83] hover:text-[#0f1a16] transition-colors">Privacy</a>
            <a href="#tech" className="text-sm text-[#5e8a83] hover:text-[#0f1a16] transition-colors">Tech Stack</a>
          </div>

          <motion.a
            href="/app"
            whileTap={TAP}
            className={`px-4 py-2 rounded-[12px] border border-[#3d7a68] bg-[#599F8A] hover:bg-[#4d8f7a] text-white text-sm font-semibold transition-colors cursor-pointer ${PRIMARY_SHADOW}`}
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Launch App
          </motion.a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[10px] uppercase tracking-widest font-mono text-[#599F8A] mb-8 ${CARD_SHADOW}`}>
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
          Deposit SOL anonymously into a shielded cryptographic pool. Generate Groth16 zero-knowledge proofs completely in-browser. Withdraw to any address with zero on-chain link.
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
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[12px] bg-white text-[#5e8a83] hover:text-[#599F8A] hover:bg-[#f0f8f5] font-semibold text-sm transition-colors cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)]"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            How it works
          </motion.a>
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-[32px] p-[6px] bg-gradient-to-b from-[rgba(255,255,255,0.18)] via-[rgba(255,255,255,0.06)] to-[rgba(89,159,138,0.08)] shadow-[0_0_0_1px_rgba(89,159,138,0.06),0_40px_80px_-20px_rgba(0,0,0,0.25)]">
          <SimulatedDashboard />
        </div>
      </section>

      {/* ── TECH STRIP ── */}
      <section className="bg-[#f7fbf9] shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_-1px_0_0_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-10">
          {[
            { label: "Proving Engine", value: "Groth16 ZK" },
            { label: "Hash Function",  value: "Poseidon"   },
            { label: "Elliptic Curve", value: "BN254"      },
            { label: "Chain",          value: "Solana"     },
            { label: "Proof Runtime",  value: "WASM"       },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-sm font-bold text-[#0f1a16]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                {value}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-[#8db5ae] mt-0.5 font-mono">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <span className={`inline-flex items-center px-3 py-1 rounded-full bg-white text-[10px] font-mono text-[#599F8A] uppercase tracking-widest mb-5 ${CARD_SHADOW}`}>
            How it works
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#0f1a16] leading-tight"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Obscura shields you in three simple steps.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {[
            {
              step: "01", icon: Shield,
              title: "Shield Funds",
              desc: "Deposit SOL. A Poseidon commitment is computed from a browser-generated secret note and registered as a leaf in the on-chain Merkle tree.",
              badge: "Deposit Stage",
            },
            {
              step: "02", icon: Cpu,
              title: "Generate Proof",
              desc: "A Groth16 zero-knowledge proof is computed locally in WASM — attesting you own a valid note in the Merkle tree without revealing which one.",
              badge: "Proving Stage",
            },
            {
              step: "03", icon: Zap,
              title: "Withdraw Privately",
              desc: "Submit the proof and a one-time nullifier on-chain. Funds are released to any address — blocking double-spends while remaining completely untraceable.",
              badge: "Withdrawal Stage",
            },
          ].map(({ step, icon: Icon, title, desc, badge }) => (
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
              <h3 className="text-base font-bold text-[#0f1a16] mb-2" style={{ fontFamily: "var(--font-raleway)" }}>
                {title}
              </h3>
              <p className="text-sm text-[#5e8a83] leading-relaxed mb-5">{desc}</p>
              <span className={`text-[9px] font-mono text-[#5e8a83] bg-white px-2 py-0.5 rounded uppercase tracking-wider ${CARD_SHADOW}`}>
                {badge}
              </span>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className={`rounded-2xl bg-[#f7fbf9] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${CARD_SHADOW}`}>
          <div>
            <p className="text-sm font-bold text-[#0f1a16]" style={{ fontFamily: "var(--font-raleway)" }}>
              Discover how Obscura makes private transfers simple and verifiable.
            </p>
            <p className="text-xs text-[#5e8a83] mt-1">
              Zero wallet links, zero trace — all proofs verified on-chain.
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

      {/* ── STATS / TRUST SECTION ── */}
      <section className="bg-[#599F8A]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-mono uppercase tracking-widest mb-5 ${CARD_SHADOW}`}>
                Trustworthy
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-white leading-tight"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Obscura shields funds and never reveals the sender.
              </h2>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Every proof is generated locally in your browser using WebAssembly. Nothing private ever leaves your device. The on-chain contract only sees a cryptographic proof — never your wallet address, deposit amount, or note.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "256-bit", label: "Cryptographic security"  },
              { value: "<2s",     label: "Proof generation time"   },
              { value: "0",       label: "Wallet links on-chain"   },
              { value: "Groth16", label: "ZK proof system"         },
            ].map(({ value, label }) => (
              <div key={label} className={`rounded-2xl bg-white p-6 ${CARD_SHADOW}`}>
                <p className="text-2xl font-extrabold text-[#0f1a16] mb-1" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  {value}
                </p>
                <p className="text-xs text-[#5e8a83] leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIVACY CIRCUIT ── */}
      <section id="privacy" className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div className="space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#599F8A] mb-3">
              <Code size={12} /> Mathematical Privacy
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-[#0f1a16] leading-tight"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              What is committed — and what remains invisible
            </h2>
          </div>
          <p className="text-sm text-[#5e8a83] leading-relaxed">
            Every deposit updates a public Merkle tree. Zero-knowledge proofs verify path elements and valid secrets completely in-memory — leaving zero trace in transaction graphs.
          </p>
          <div className="space-y-3">
            {[
              { term: "Commitment hash",        desc: "Verifiable publicly, yet completely unlinkable to your wallet." },
              { term: "Merkle Root Update",     desc: "Registers your token without listing keys or amounts." },
              { term: "ZK Proof Verification",  desc: "Attests tree membership while disclosing zero indices." },
              { term: "Double-Spend Nullifier", desc: "Prevents duplicate spends with zero reference to deposits." },
            ].map(({ term, desc }) => (
              <div key={term} className="flex items-start gap-2.5 text-sm text-[#5e8a83]">
                <CheckCircle2 size={15} className="text-[#599F8A] mt-0.5 flex-shrink-0" />
                <p>
                  <span className="font-semibold text-[#0f1a16]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                    {term}
                  </span>
                  {" — "}{desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl bg-[#f7fbf9] p-5 ${CARD_SHADOW}`}>
          <div className="flex items-center justify-between shadow-[0_1px_0_0_rgba(0,0,0,0.06)] pb-3 mb-4 text-[10px] font-mono text-[#5e8a83]">
            <span className="flex items-center gap-1.5 text-[#0f1a16] font-semibold">
              <Terminal size={12} className="text-[#599F8A]" /> ZK_Withdrawal.circom
            </span>
            <span className={`text-[9px] uppercase bg-white px-1.5 py-0.5 rounded text-[#599F8A] ${CARD_SHADOW}`}>
              Poseidon Hash
            </span>
          </div>
          <pre
            className="text-[10px] leading-6 text-[#3d7a68] whitespace-pre overflow-x-auto"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >{`template Withdrawal(levels) {
  // Private — never broadcast on-chain
  signal private secret;
  signal private pathElements[levels];

  // Commitment = Poseidon(secret)
  component h = Poseidon(1);
  h.inputs[0] <== secret;
  signal commitment <== h.out;

  // Verify Merkle path membership
  component tree = MerkleProof(levels);
  tree.leaf  <== commitment;
  tree.root  === merkleRoot;  // Public

  // Nullifier prevents double-spend
  component n = Poseidon(2);
  n.inputs[0] <== secret;
  n.out        === nullifier; // Public
}`}</pre>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="tech" className="bg-[#f7fbf9] shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_-1px_0_0_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="text-[10px] uppercase font-mono tracking-widest text-[#8db5ae] mb-8">Built with</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              "Next.js 16", "React 19", "Tailwind CSS v4", "Solana Devnet",
              "Groth16 ZK", "Poseidon Hash", "BN254 Curve", "WASM",
              "TypeScript 5", "Bun",
            ].map((tech) => (
              <span
                key={tech}
                className={`px-3.5 py-1.5 rounded-xl bg-white text-[10px] font-mono text-[#5e8a83] hover:text-[#599F8A] transition-colors cursor-default ${CARD_SHADOW} hover:shadow-[0_0_0_1px_rgba(89,159,138,0.2),0_1px_4px_rgba(89,159,138,0.06)]`}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white shadow-[0_-1px_0_0_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="15" stroke="#599F8A" strokeWidth="2.5" opacity="0.7" fill="none" />
            </svg>
            <span className="text-sm font-extrabold text-[#0f1a16] uppercase tracking-wider" style={{ fontFamily: "var(--font-raleway)" }}>
              Obscura
            </span>
          </div>
          <p className="text-[10px] text-[#8db5ae] font-mono text-center">
            Devnet alpha — test funds have no real value
          </p>
          <Link
            href="/app"
            className="text-xs font-bold text-[#5e8a83] hover:text-[#599F8A] transition-colors flex items-center gap-1"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Launch Privacy Pool →
          </Link>
        </div>
      </footer>
    </div>
  );
}
