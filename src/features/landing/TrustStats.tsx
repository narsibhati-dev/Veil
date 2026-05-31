const CARD_SHADOW =
  "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)]";

const STATS = [
  { value: "256-bit", label: "Cryptographic security" },
  { value: "<2s",     label: "Proof generation time"  },
  { value: "0",       label: "Wallet links on-chain"  },
  { value: "Groth16", label: "ZK proof system"        },
] as const;

export default function TrustStats() {
  return (
    <section className="bg-[#599F8A]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-mono uppercase tracking-widest mb-5 ${CARD_SHADOW}`}
            >
              Trustworthy
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Veil shields funds and never reveals the sender.
            </h2>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Every proof is generated locally in your browser using WebAssembly. Nothing
            private ever leaves your device. The on-chain contract only sees a cryptographic
            proof, never your wallet address, deposit amount, or note.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15 border border-white/15 rounded-2xl overflow-hidden">
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col justify-between px-7 py-6 group hover:bg-white/[0.06] transition-colors duration-200 ${i >= 2 ? "border-t border-white/15 md:border-t-0" : ""}`}
            >
              <p
                className="text-4xl font-extrabold text-white tracking-tight leading-none mb-3"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {value}
              </p>
              <div>
                <div className="w-6 h-px bg-white/30 mb-2 group-hover:w-10 transition-all duration-300" />
                <p className="text-xs text-white/60 uppercase tracking-widest leading-snug font-medium">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
