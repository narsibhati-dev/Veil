"use client";

import { Coins, ArrowRight, Check } from "lucide-react";

const PRIMARY =
  "border border-[#3d7a68] bg-[#599F8A] hover:bg-[#4d8f7a] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),0_1px_2px_0_rgba(0,0,0,0.12),0_2px_4px_0_rgba(0,0,0,0.08)]";

const AMOUNTS = [1, 5, 10, 50] as const;

const TECH_PILLS = [
  { label: "BN254",   dot: "bg-[#6db5a0]"   },
  { label: "Groth16", dot: "bg-[#6db5a0]"   },
  { label: "Solana",  dot: "bg-emerald-400" },
] as const;

interface ShieldTabProps {
  depositAmount: number;
  setDepositAmount: (n: number) => void;
  isGenerating: boolean;
  step: number;
  commitment: string;
  secret: string;
  onShield: () => void;
}

export default function ShieldTab({
  depositAmount, setDepositAmount, isGenerating, step, commitment, secret, onShield,
}: ShieldTabProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-stretch">
      {/* Left — controls */}
      <div className="flex flex-col justify-between space-y-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#6db5a0] uppercase tracking-widest flex items-center gap-2">
              <Coins size={16} className="text-[#599F8A]" /> Deposit Amount
            </label>
            <span className="text-xs font-mono text-[#599F8A]/80">Solana Devnet Pool</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => !isGenerating && setDepositAmount(amt)}
                className={`py-2.5 rounded-xl border text-xs font-mono font-semibold transition-all duration-200 ${
                  depositAmount === amt && !isGenerating
                    ? "border-[#3d7a68] bg-[#599F8A]/20 text-[#8ecabb] shadow-[0_0_12px_rgba(89,159,138,0.2)]"
                    : "border-white/[0.08] text-[#6db5a0]/70 hover:border-white/[0.15] hover:text-[#8ecabb]"
                }`}
              >
                {amt} SOL
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-white/[0.07] p-4 space-y-3">
            {[
              { label: "Asset",               value: "SOL (Solana)", mono: true  },
              { label: "Poseidon Commitment",  value: commitment,     mono: true  },
              { label: "Secret Note (Key)",    value: secret,         mono: true  },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-[#6db5a0]/60">{label}</span>
                <span className="font-mono text-[#6db5a0] text-xs">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Log console */}
        <div className="rounded-xl border border-white/[0.06] p-3 h-24 font-mono text-xs leading-relaxed text-[#6db5a0]/80 overflow-hidden space-y-1 select-none">
          <p className="text-[#599F8A]/90 font-semibold">{`// Cryptographic log console`}</p>
          {step === 0 && <p className="text-[#6db5a0]/50">{`> Waiting for shield initialization...`}</p>}
          {step >= 1 && <p className="text-[#6db5a0]">{`> [WASM] Generating Poseidon secret note: ${secret}`}</p>}
          {step >= 2 && <p className="text-[#6db5a0]">{`> [WASM] Hashing commitment: Hash(${secret.slice(0, 15)}...) = ${commitment}`}</p>}
          {step >= 3 && <p className="text-purple-400">{`> [SOL] Submitting deposit transaction to lightprotocol contract...`}</p>}
          {step >= 4 && <p className="text-emerald-400 font-semibold">{`✓ Success! Transaction confirmed. SOL added to privacy pool.`}</p>}
        </div>

        <button
          onClick={onShield}
          disabled={isGenerating || step === 4}
          className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 disabled:opacity-50 ${PRIMARY}`}
        >
          <span className="flex items-center justify-center gap-2">
            {isGenerating ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Shielding SOL...</>
            ) : step === 4 ? (
              <><Check size={18} className="text-emerald-200" /> Shield Complete</>
            ) : (
              <>Shield {depositAmount} SOL <ArrowRight size={16} /></>
            )}
          </span>
        </button>
      </div>

      {/* Right — Merkle visualizer */}
      <div className="flex flex-col rounded-2xl border border-white/[0.08] overflow-hidden">
        <div className="relative flex-1 flex items-center justify-center p-6 pb-4">
          <svg viewBox="0 0 200 120" className="w-full h-full max-w-[340px]">
            <circle cx="100" cy="20" r="8" className={`fill-[#111111] stroke-2 ${step >= 3 ? "stroke-emerald-400" : "stroke-[#599F8A]"}`} />
            <text x="100" y="23" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">R</text>

            <line x1="100" y1="20" x2="60" y2="50" className={`stroke-2 ${step >= 3 ? "stroke-emerald-500/80" : "stroke-white/10"}`} />
            <line x1="100" y1="20" x2="140" y2="50" className="stroke-white/[0.08] stroke-1" />

            <circle cx="60" cy="50" r="7" className={`fill-[#111111] stroke-2 ${step >= 2 ? "stroke-[#6db5a0]" : "stroke-white/10"}`} />
            <circle cx="140" cy="50" r="7" className="fill-[#111111] stroke-white/[0.08] stroke-1" />

            <line x1="60" y1="50" x2="40" y2="80" className={`stroke-2 ${step >= 2 ? "stroke-[#599F8A]/80" : "stroke-white/[0.08]"}`} />
            <line x1="60" y1="50" x2="80" y2="80" className="stroke-white/[0.08] stroke-1" />

            <circle cx="40" cy="80" r="6" className={`fill-[#111111] stroke-2 ${step >= 2 ? "stroke-[#6db5a0]" : "stroke-white/[0.08]"}`} />
            <circle cx="80" cy="80" r="6" className="fill-[#111111] stroke-white/[0.08] stroke-1" />
            <circle cx="120" cy="80" r="6" className="fill-[#111111] stroke-white/[0.08] stroke-1" />
            <circle cx="160" cy="80" r="6" className="fill-[#111111] stroke-white/[0.08] stroke-1" />

            <line x1="40" y1="80" x2="30" y2="105" className={`stroke-2 ${step >= 1 ? "stroke-[#6db5a0]" : "stroke-white/[0.06]"}`} />
            <line x1="40" y1="80" x2="50" y2="105" className="stroke-white/[0.06] stroke-1" />

            <circle cx="30" cy="105" r="5" className={`fill-[#111111] stroke-2 ${step >= 1 ? "stroke-[#8ecabb]" : "stroke-white/[0.06]"}`} />
            <circle cx="50" cy="105" r="5" className="fill-[#111111] stroke-white/[0.06] stroke-1" />
            <circle cx="70" cy="105" r="5" className="fill-[#111111] stroke-white/[0.06] stroke-1" />
            <circle cx="90" cy="105" r="5" className="fill-[#111111] stroke-white/[0.06] stroke-1" />

            {step >= 1 && <g className="animate-pulse"><circle cx="30" cy="105" r="8" className="fill-transparent stroke-[#6db5a0]/40 stroke-1" /></g>}
            {step >= 2 && <g className="animate-pulse"><circle cx="40" cy="80" r="9" className="fill-transparent stroke-[#6db5a0]/40 stroke-1" /><circle cx="60" cy="50" r="10" className="fill-transparent stroke-[#6db5a0]/40 stroke-1" /></g>}
            {step >= 3 && <g className="animate-pulse"><circle cx="100" cy="20" r="12" className="fill-transparent stroke-emerald-400/40 stroke-1" /></g>}
          </svg>

          {isGenerating && (
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute w-3 h-3 rounded-sm bg-[#6db5a0] animate-ping left-[15%] bottom-[15%]" />
              <span className="absolute w-2.5 h-2.5 rounded-sm bg-[#6db5a0] animate-ping left-[20%] top-[35%] [animation-delay:0.5s]" />
              <span className="absolute w-2 h-2 rounded-sm bg-emerald-400 animate-ping left-[48%] top-[12%] [animation-delay:1.2s]" />
            </div>
          )}
        </div>

        <div className="border-t border-white/[0.06] px-6 py-5 text-center space-y-3">
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-raleway)" }}>
              Merkle Tree Membership
            </h4>
            <p className="text-xs text-white/50 mt-1.5 leading-relaxed">
              {step === 0 && "Your deposit is hashed into a Poseidon commitment leaf in an on-chain depth-4 Merkle tree."}
              {step === 1 && "Generating local cryptographic secret parameters in WASM..."}
              {step === 2 && "Poseidon leaf hashes established. Computing parent paths..."}
              {step === 3 && "Broadcasting Merkle root update to Solana node..."}
              {step === 4 && "Leaf committed. You can now withdraw privately using a ZK-Proof."}
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            {TECH_PILLS.map(({ label, dot }) => (
              <span key={label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.08] text-[10px] font-mono text-white/40">
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
