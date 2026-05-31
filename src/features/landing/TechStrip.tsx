const ITEMS = [
  { label: "Proving Engine", value: "Groth16 ZK" },
  { label: "Hash Function",  value: "Poseidon"   },
  { label: "Elliptic Curve", value: "BN254"      },
  { label: "Chain",          value: "Solana"     },
  { label: "Proof Runtime",  value: "WASM"       },
] as const;

export default function TechStrip() {
  return (
    <section
      id="tech"
      className="bg-[#f7fbf9] shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_-1px_0_0_rgba(0,0,0,0.05)]"
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-10">
        {ITEMS.map(({ label, value }) => (
          <div key={label} className="text-center">
            <p
              className="text-sm font-bold text-[#0f1a16]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {value}
            </p>
            <p className="text-[9px] uppercase tracking-widest text-[#8db5ae] mt-0.5 font-mono">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
