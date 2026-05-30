import Link from "next/link";
import DevnetBanner from "@/components/layout/DevnetBanner";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DevnetBanner />

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-[#1e1e3a]/60 backdrop-blur-xl bg-[#0a0a0f]/85">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="navLogo" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
              <polygon points="12,1 28,1 39,12 39,28 28,39 12,39 1,28 1,12" fill="url(#navLogo)" />
              <text x="20" y="27" textAnchor="middle" fontSize="19" fontWeight="800" fill="white" fontFamily="sans-serif" letterSpacing="-1">O</text>
            </svg>
            <span className="text-xl font-black text-[#f1f5f9] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              Obscura
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#161626] border border-[#1e1e3a] text-[#475569] text-xs"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" style={{ animation: "glowPulse 2s ease infinite" }} />
              devnet
            </span>
            <Link
              href="/app"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Launch App →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-28 pb-24 text-center overflow-hidden">
        {/* Background glow orbs */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(16,185,129,0.04) 0%, transparent 65%)",
          }}
        />

        <div
          className="relative max-w-3xl mx-auto space-y-7"
          style={{ animation: "fadeUp 0.7s ease both" }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6366f1]/25 bg-[#6366f1]/5 text-[#6366f1] text-xs uppercase tracking-widest"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" style={{ animation: "glowPulse 2s ease infinite" }} />
            Zero-Knowledge Privacy on Solana
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(3.5rem,11vw,7rem)] font-black leading-none tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="text-[#f1f5f9]">Private</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Payments.
            </span>
          </h1>

          <p className="text-lg text-[#475569] max-w-xl mx-auto leading-relaxed">
            Deposit SOL into a shared privacy pool. Generate a Groth16 zero-knowledge proof.
            Withdraw to any address — with no on-chain link between sender and recipient.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white text-sm font-semibold hover:shadow-[0_0_36px_rgba(99,102,241,0.45)] transition-all duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Open App
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="https://explorer.solana.com/?cluster=devnet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-[#1e1e3a] bg-[#0f0f1a] text-[#475569] text-sm hover:border-[#2d2d5e] hover:text-[#94a3b8] transition-all duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Solana Explorer ↗
            </a>
          </div>
        </div>
      </section>

      {/* Proof spec strip */}
      <div className="border-y border-[#1e1e3a]">
        <div className="max-w-4xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-[#1e1e3a]">
          {[
            { label: "Proving System", value: "Groth16" },
            { label: "Hash Function",  value: "Poseidon" },
            { label: "Elliptic Curve", value: "BN254"    },
          ].map(({ label, value }) => (
            <div key={label} className="px-6 text-center">
              <p
                className="text-base font-bold text-[#818cf8]"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {value}
              </p>
              <p className="text-xs text-[#334155] mt-1 uppercase tracking-widest">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2
            className="text-4xl font-black text-[#f1f5f9] mb-3"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            How it works
          </h2>
          <p className="text-[#475569] text-sm">
            Three steps. No on-chain link between sender and recipient.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="rounded-2xl border border-[#1e1e3a] bg-[#0f0f1a] p-6 space-y-4">
            <div
              className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center text-sm font-bold text-[#6366f1]"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              01
            </div>
            <div>
              <h3
                className="text-base font-bold text-[#f1f5f9] mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Shield SOL
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Deposit any amount. The SDK computes a Poseidon commitment — a hash of your random
                secret — and submits it as a leaf in an on-chain Merkle tree. Your secret never
                leaves your browser.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-[#1e1e3a] bg-[#0f0f1a] p-6 space-y-4">
            <div
              className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center text-sm font-bold text-[#6366f1]"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              02
            </div>
            <div>
              <h3
                className="text-base font-bold text-[#f1f5f9] mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Generate Proof
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                A Groth16 zero-knowledge proof is built entirely in-browser via WASM. It attests
                that you know a valid leaf in the Merkle tree — without revealing which one.
                Anyone can verify it; no one can trace it.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-[#10b981]/20 bg-[#10b981]/[0.03] p-6 space-y-4">
            <div
              className="w-10 h-10 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-sm font-bold text-[#10b981]"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              03
            </div>
            <div>
              <h3
                className="text-base font-bold text-[#f1f5f9] mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Withdraw Anywhere
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Submit the proof and a nullifier to the on-chain verifier. Funds are released to
                any address. The nullifier prevents double-spending while creating zero link
                to your original deposit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy model + circuit */}
      <section className="border-t border-[#1e1e3a] bg-[#0f0f1a]/40">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: explanation */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-[#6366f1] mb-4"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              The privacy model
            </p>
            <h2
              className="text-3xl font-black text-[#f1f5f9] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              What the chain sees —{" "}
              <span className="text-[#334155]">and what it doesn&apos;t</span>
            </h2>
            <p className="text-[#475569] leading-relaxed mb-6 text-sm">
              The on-chain record is only a Poseidon hash. Every withdrawal submits a
              Groth16 membership proof — verifiable by anyone, interpretable by no one.
            </p>
            <ul className="space-y-3">
              {[
                ["Commitment hash", "public, but unlinkable to your wallet"],
                ["Merkle root", "summarises all deposits without revealing any"],
                ["ZK proof", "proves leaf membership — not which leaf"],
                ["Nullifier", "prevents double-spend, creates no deposit link"],
              ].map(([term, desc]) => (
                <li key={term} className="flex items-start gap-3 text-sm">
                  <span className="text-[#10b981] mt-0.5 flex-shrink-0 font-bold">✓</span>
                  <span>
                    <span className="text-[#94a3b8] font-medium" style={{ fontFamily: "var(--font-space-mono)" }}>
                      {term}
                    </span>
                    <span className="text-[#475569]"> — {desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: circuit pseudocode */}
          <div className="rounded-2xl border border-[#1e1e3a] bg-[#0a0a0f] p-5 overflow-x-auto">
            <p
              className="text-xs text-[#334155] uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              ZK Circuit — simplified
            </p>
            <pre
              className="text-xs leading-6 text-[#475569] whitespace-pre"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >{`template Withdrawal(levels) {
  // Private — never revealed on-chain
  signal private secret;
  signal private pathElements[levels];

  // Commitment = Poseidon(secret)
  component h = Poseidon(1);
  h.inputs[0] <== secret;
  signal commitment <== h.out;

  // Merkle membership proof
  component tree = MerkleProof(levels);
  tree.leaf     <== commitment;
  tree.root     === merkleRoot;   // public

  // Nullifier prevents double-spend
  component n = Poseidon(2);
  n.inputs[0]  <== secret;
  n.out        === nullifier;     // public
}`}</pre>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="text-xs uppercase tracking-widest text-[#334155] mb-7">Built with</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {[
            "Next.js 16",
            "React 19",
            "Tailwind CSS v4",
            "Solana devnet",
            "@solana/wallet-adapter",
            "Groth16",
            "Poseidon",
            "BN254",
            "WASM",
            "TypeScript 5",
            "bun",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3.5 py-1.5 rounded-full border border-[#1e1e3a] bg-[#0f0f1a] text-xs text-[#334155] hover:border-[#2d2d5e] hover:text-[#94a3b8] transition-colors"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e3a] mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <polygon points="12,1 28,1 39,12 39,28 28,39 12,39 1,28 1,12" fill="#6366f1" opacity="0.6" />
            </svg>
            <span
              className="text-sm text-[#2d2d5e]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Obscura
            </span>
          </div>
          <p className="text-xs text-[#1e1e3a] text-center">
            Devnet demo only — all funds are testnet SOL with no real value
          </p>
          <Link
            href="/app"
            className="text-sm text-[#6366f1] hover:text-[#818cf8] transition-colors"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Open App →
          </Link>
        </div>
      </footer>
    </div>
  );
}
