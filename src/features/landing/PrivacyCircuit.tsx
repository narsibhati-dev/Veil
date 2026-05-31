import React from "react";
import { Code, Terminal, CheckCircle2 } from "lucide-react";

const CHECKS = [
  { term: "Commitment hash",        desc: "Verifiable publicly, yet completely unlinkable to your wallet." },
  { term: "Merkle Root Update",     desc: "Registers your token without listing keys or amounts." },
  { term: "ZK Proof Verification",  desc: "Attests tree membership while disclosing zero indices." },
  { term: "Double-Spend Nullifier", desc: "Prevents duplicate spends with zero reference to deposits." },
] as const;

const CODE_LINES: { content: React.ReactNode }[] = [
  { content: <><span className="text-[#569cd6]">template</span> <span className="text-[#dcdcaa]">Withdrawal</span><span className="text-[#d4d4d4]">(</span><span className="text-[#9cdcfe]">levels</span><span className="text-[#d4d4d4]">) {"{"}</span></> },
  { content: <><span className="text-[#6a9955]">{"  "}// Private - never broadcast on-chain</span></> },
  { content: <><span className="text-[#569cd6]">{"  "}signal</span> <span className="text-[#569cd6]">private</span> <span className="text-[#9cdcfe]">secret</span><span className="text-[#d4d4d4]">;</span></> },
  { content: <><span className="text-[#569cd6]">{"  "}signal</span> <span className="text-[#569cd6]">private</span> <span className="text-[#9cdcfe]">pathElements</span><span className="text-[#d4d4d4]">[</span><span className="text-[#9cdcfe]">levels</span><span className="text-[#d4d4d4]">];</span></> },
  { content: <></> },
  { content: <><span className="text-[#6a9955]">{"  "}// Commitment = Poseidon(secret)</span></> },
  { content: <><span className="text-[#569cd6]">{"  "}component</span> <span className="text-[#9cdcfe]">h</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#dcdcaa]">Poseidon</span><span className="text-[#d4d4d4]">(</span><span className="text-[#b5cea8]">1</span><span className="text-[#d4d4d4]">);</span></> },
  { content: <><span className="text-[#9cdcfe]">{"  "}h</span><span className="text-[#d4d4d4]">.</span><span className="text-[#9cdcfe]">inputs</span><span className="text-[#d4d4d4]">[</span><span className="text-[#b5cea8]">0</span><span className="text-[#d4d4d4]">]</span> <span className="text-[#89ddff]">{"<=="}</span> <span className="text-[#9cdcfe]">secret</span><span className="text-[#d4d4d4]">;</span></> },
  { content: <><span className="text-[#569cd6]">{"  "}signal</span> <span className="text-[#9cdcfe]">commitment</span> <span className="text-[#89ddff]">{"<=="}</span> <span className="text-[#9cdcfe]">h</span><span className="text-[#d4d4d4]">.</span><span className="text-[#9cdcfe]">out</span><span className="text-[#d4d4d4]">;</span></> },
  { content: <></> },
  { content: <><span className="text-[#6a9955]">{"  "}// Verify Merkle path membership</span></> },
  { content: <><span className="text-[#569cd6]">{"  "}component</span> <span className="text-[#9cdcfe]">tree</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#dcdcaa]">MerkleProof</span><span className="text-[#d4d4d4]">(</span><span className="text-[#9cdcfe]">levels</span><span className="text-[#d4d4d4]">);</span></> },
  { content: <><span className="text-[#9cdcfe]">{"  "}tree</span><span className="text-[#d4d4d4]">.</span><span className="text-[#9cdcfe]">leaf</span>{"  "}<span className="text-[#89ddff]">{"<=="}</span> <span className="text-[#9cdcfe]">commitment</span><span className="text-[#d4d4d4]">;</span></> },
  { content: <><span className="text-[#9cdcfe]">{"  "}tree</span><span className="text-[#d4d4d4]">.</span><span className="text-[#9cdcfe]">root</span>{"  "}<span className="text-[#89ddff]">{"==="}</span> <span className="text-[#9cdcfe]">merkleRoot</span><span className="text-[#d4d4d4]">;</span>{"  "}<span className="text-[#6a9955]">// Public</span></> },
  { content: <></> },
  { content: <><span className="text-[#6a9955]">{"  "}// Nullifier prevents double-spend</span></> },
  { content: <><span className="text-[#569cd6]">{"  "}component</span> <span className="text-[#9cdcfe]">n</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#dcdcaa]">Poseidon</span><span className="text-[#d4d4d4]">(</span><span className="text-[#b5cea8]">2</span><span className="text-[#d4d4d4]">);</span></> },
  { content: <><span className="text-[#9cdcfe]">{"  "}n</span><span className="text-[#d4d4d4]">.</span><span className="text-[#9cdcfe]">inputs</span><span className="text-[#d4d4d4]">[</span><span className="text-[#b5cea8]">0</span><span className="text-[#d4d4d4]">]</span> <span className="text-[#89ddff]">{"<=="}</span> <span className="text-[#9cdcfe]">secret</span><span className="text-[#d4d4d4]">;</span></> },
  { content: <><span className="text-[#9cdcfe]">{"  "}n</span><span className="text-[#d4d4d4]">.</span><span className="text-[#9cdcfe]">out</span>{"        "}<span className="text-[#89ddff]">{"==="}</span> <span className="text-[#9cdcfe]">nullifier</span><span className="text-[#d4d4d4]">;</span> <span className="text-[#6a9955]">// Public</span></> },
  { content: <><span className="text-[#d4d4d4]">{"}"}</span></> },
];

export default function PrivacyCircuit() {
  return (
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
            What is committed and what remains invisible
          </h2>
        </div>
        <p className="text-sm text-[#5e8a83] leading-relaxed">
          Every deposit updates a public Merkle tree. Zero-knowledge proofs verify path
          elements and valid secrets completely in-memory, leaving zero trace in transaction graphs.
        </p>
        <div className="space-y-3">
          {CHECKS.map(({ term, desc }) => (
            <div key={term} className="flex items-start gap-2.5 text-sm text-[#5e8a83]">
              <CheckCircle2 size={15} className="text-[#599F8A] mt-0.5 flex-shrink-0" />
              <p>
                <span
                  className="font-semibold text-[#0f1a16]"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {term}
                </span>
                {": "}{desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4px_24px_rgba(0,0,0,0.12)]">
        <div className="bg-[#1e1e1e] px-4 py-3 flex items-center justify-between border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-1.5 bg-[#2d2d2d] px-3 py-1 rounded-md">
              <Terminal size={11} className="text-[#599F8A]" />
              <span
                className="text-[11px] text-[#cccccc]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                ZK_Withdrawal.circom
              </span>
            </div>
          </div>
          <span
            className="text-[10px] uppercase tracking-widest text-[#599F8A] bg-[#599F8A]/10 border border-[#599F8A]/20 px-2.5 py-1 rounded-md"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            circom
          </span>
        </div>
        <div className="bg-[#1e1e1e] overflow-x-auto">
          <table
            className="w-full border-collapse text-[12px] leading-6"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <tbody>
              {CODE_LINES.map(({ content }, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="pl-4 pr-3 py-0 text-right text-[#4e4e4e] select-none w-8">{i + 1}</td>
                  <td className="pr-6 py-0 text-[#d4d4d4] whitespace-pre">{content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
