import { ShieldCheck, Info } from "lucide-react";

const PRIMARY =
  "border border-[#3d7a68] bg-[#599F8A] hover:bg-[#4d8f7a] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),0_1px_2px_0_rgba(0,0,0,0.12),0_2px_4px_0_rgba(0,0,0,0.08)]";

const PROOF_STEPS = [
  { n: "01", label: "Load secret note",       sub: "Decode key → secret + amount"    },
  { n: "02", label: "Build Merkle path",       sub: "Fetch sibling hashes from chain" },
  { n: "03", label: "Generate Groth16 proof",  sub: "WASM prover ~900 ms in-browser"  },
  { n: "04", label: "Submit & nullify",        sub: "On-chain verification + payout"  },
] as const;

const TECH_PILLS = [
  { label: "BN254",   dot: "bg-[#6db5a0]"   },
  { label: "Groth16", dot: "bg-[#6db5a0]"   },
  { label: "Solana",  dot: "bg-emerald-400" },
] as const;

export default function WithdrawTab() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-stretch">
      {/* Left — form */}
      <div className="flex flex-col justify-between space-y-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#6db5a0] uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#599F8A]" /> Private Withdraw
            </label>
            <span className="text-xs font-mono text-[#599F8A]/80">Solana Devnet Pool</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#6db5a0]/60 uppercase tracking-wider block mb-1.5">Secret Note</label>
            <input
              type="text"
              placeholder="veil-amountsol-secretkey..."
              readOnly
              className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] text-xs font-mono text-[#a8d5cc] placeholder-[#6db5a0]/20 focus:outline-none focus:border-[#599F8A] bg-transparent"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#6db5a0]/60 uppercase tracking-wider block mb-1.5">Recipient Address</label>
            <input
              type="text"
              placeholder="Solana wallet address (e.g. Fv4h...)"
              readOnly
              className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] text-xs font-mono text-[#a8d5cc] placeholder-[#6db5a0]/20 focus:outline-none focus:border-[#599F8A] bg-transparent"
            />
          </div>

          <div className="rounded-xl border border-white/[0.06] p-3 flex items-start gap-2.5">
            <Info size={13} className="text-[#599F8A] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#6db5a0]/50 leading-relaxed">
              A fresh Groth16 ZK-Proof verifies leaf membership without disclosing which note
              is spent. A nullifier prevents double-spending.
            </p>
          </div>
        </div>

        <button className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2.5 ${PRIMARY}`}>
          <ShieldCheck size={16} /> Prove &amp; Withdraw SOL
        </button>
      </div>

      {/* Right — proof steps */}
      <div className="flex flex-col rounded-2xl border border-white/[0.08] overflow-hidden">
        <div className="flex-1 flex flex-col justify-center px-6 py-5 space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-[#6db5a0]/50">Proof generation steps</p>
          {PROOF_STEPS.map(({ n, label, sub }) => (
            <div key={n} className="flex items-start gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
              <span className="text-[10px] font-mono font-bold text-[#599F8A]/60 mt-0.5 w-5 flex-shrink-0">{n}</span>
              <div>
                <p className="text-xs font-semibold text-white/70">{label}</p>
                <p className="text-[10px] text-[#6db5a0]/40 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] px-6 py-3 flex gap-2">
          {TECH_PILLS.map(({ label, dot }) => (
            <span key={label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.08] text-[10px] font-mono text-white/40">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
