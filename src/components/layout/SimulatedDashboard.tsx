"use client";

import { useState, useEffect } from "react";
import {
  Lock, History, Cpu, Wallet,
  Coins, ArrowRight, ShieldCheck, Check, Info
} from "lucide-react";
import LogoIcon from "@/components/ui/LogoIcon";

type MockTab = "shield" | "withdraw" | "history" | "proofs";

const PRIMARY =
  "border border-[#3d7a68] bg-[#599F8A] hover:bg-[#4d8f7a] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_1px_0_0_0_rgba(255,255,255,0.3),inset_-1px_0_0_0_rgba(255,255,255,0.3),inset_4px_4px_0_0_rgba(255,255,255,0.06),inset_-4px_-4px_0_0_rgba(255,255,255,0.06),inset_6px_6px_0_0_rgba(255,255,255,0.04),inset_-6px_-6px_0_0_rgba(255,255,255,0.04),inset_8px_8px_0_0_rgba(255,255,255,0.02),inset_-8px_-8px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.12),0_2px_4px_0_rgba(0,0,0,0.08),0_4px_6px_0_rgba(0,0,0,0.06),0_6px_8px_0_rgba(0,0,0,0.04),0_2px_1px_0_rgba(0,0,0,0.06)]";

export default function SimulatedDashboard() {
  const [activeTab, setActiveTab] = useState<MockTab>("shield");
  const [depositAmount, setDepositAmount] = useState<number>(10);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [commitment, setCommitment] = useState<string>("0x8b3af...9f2e");
  const [secret, setSecret] = useState<string>("veil-10sol-8af2...6c1d");
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const hex = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setCommitment(`0x${hex.slice(0, 6)}...${hex.slice(-4)}`);
    setSecret(`veil-${depositAmount}sol-${hex.slice(0, 10)}...${hex.slice(-6)}`);
  }, [depositAmount]);

  const triggerSimulateShield = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setStep(1);
    setTimeout(() => setStep(2), 1200);
    setTimeout(() => setStep(3), 2400);
    setTimeout(() => { setStep(4); setIsGenerating(false); }, 3800);
  };

  return (
    <div className="w-full rounded-[28px] glass-card overflow-hidden transition-all duration-300">

      {/* Header */}
      <div className="px-8 py-5 border-b border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LogoIcon size={40} />
          <span className="text-lg font-extrabold text-[#e8f5f2] tracking-wider uppercase" style={{ fontFamily: "var(--font-raleway)" }}>
            Veil{" "}
            <span className="text-xs font-mono font-normal tracking-normal text-[#6db5a0]/80 lowercase bg-[#599F8A]/10 border border-[#599F8A]/20 px-2 py-0.5 rounded ml-1">v1.0-dev</span>
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-3 text-sm font-mono">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.07] text-[#8ecabb]">
            <Wallet size={14} className="text-[#6db5a0]" />
            <span className="text-[#6db5a0]/60 uppercase text-xs">Balance:</span>
            <span className="font-bold text-[#e8f5f2]">1,248.50 SOL</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.07] text-[#8ecabb]">
            <span className="w-2 h-2 rounded-full bg-[#6db5a0] shadow-[0_0_6px_#6db5a0] animate-pulse" />
            <span className="text-[#6db5a0]/60 uppercase text-xs">Tier:</span>
            <span className="font-bold text-[#e8f5f2]">GOLD TIER <span className="text-[#6db5a0]">(9.4K PTS)</span></span>
          </div>
          <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${PRIMARY}`}>
            Add Funds
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 border-b border-white/[0.06] flex items-center overflow-x-auto gap-1">
        {[
          { id: "shield",   label: "Shield SOL",       icon: Lock        },
          { id: "withdraw", label: "Private Withdraw",  icon: ShieldCheck },
          { id: "history",  label: "Transaction Logs",  icon: History     },
          { id: "proofs",   label: "ZK Circuit Logs",   icon: Cpu         },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MockTab)}
              className={`px-6 py-5 border-b-2 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "border-[#599F8A] text-[#8ecabb]"
                  : "border-transparent text-[#6db5a0]/50 hover:text-[#8ecabb]/80"
              }`}
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              <Icon size={16} className={isActive ? "text-[#6db5a0]" : "text-[#6db5a0]/40"} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel Body */}
      <div className="p-8 md:p-10 min-h-[430px]">

        {/* SHIELD TAB */}
        {activeTab === "shield" && (
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[#6db5a0] uppercase tracking-widest flex items-center gap-2">
                    <Coins size={16} className="text-[#599F8A]" /> Deposit Amount
                  </label>
                  <span className="text-xs font-mono text-[#599F8A]/80">Solana Devnet Pool</span>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {[1, 5, 10, 50].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => !isGenerating && setDepositAmount(amt)}
                      className={`py-3.5 rounded-xl border text-sm font-mono font-bold transition-all duration-200 ${
                        depositAmount === amt && !isGenerating
                          ? "border-[#3d7a68] bg-[#599F8A]/20 text-[#8ecabb] shadow-[0_0_12px_rgba(89,159,138,0.2)]"
                          : "border-white/[0.08] text-[#6db5a0]/70 hover:border-white/[0.15] hover:text-[#8ecabb]"
                      }`}
                    >
                      {amt} SOL
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/[0.07] p-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6db5a0]/60">Asset</span>
                    <span className="font-mono text-[#8ecabb]">SOL (Solana)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6db5a0]/60">Poseidon Commitment</span>
                    <span className="font-mono text-[#6db5a0] text-xs">{commitment}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6db5a0]/60">Secret Note (Key)</span>
                    <span className="font-mono text-[#599F8A] text-xs select-all cursor-pointer hover:text-[#6db5a0] transition-colors">
                      {secret}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] p-4 h-36 font-mono text-xs leading-relaxed text-[#6db5a0]/80 overflow-y-auto space-y-1.5 select-none">
                <p className="text-[#599F8A]/90 font-semibold">{`// Cryptographic log console`}</p>
                {step === 0 && <p className="text-[#6db5a0]/50">{`> Waiting for shield initialization...`}</p>}
                {step >= 1 && <p className="text-[#6db5a0]">{`> [WASM] Generating Poseidon secret note: ${secret}`}</p>}
                {step >= 2 && <p className="text-[#6db5a0]">{`> [WASM] Hashing commitment: Hash(${secret.slice(0, 15)}...) = ${commitment}`}</p>}
                {step >= 3 && <p className="text-purple-400">{`> [SOL] Submitting deposit transaction to lightprotocol contract...`}</p>}
                {step >= 4 && <p className="text-emerald-400 font-semibold">{`✓ Success! Transaction confirmed. SOL added to privacy pool.`}</p>}
              </div>

              <button
                onClick={triggerSimulateShield}
                disabled={isGenerating || step === 4}
                className={`w-full py-4 rounded-xl font-bold text-base tracking-wider uppercase transition-all duration-200 disabled:opacity-50 ${PRIMARY}`}
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

            {/* ZK Visualizer */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] p-8 text-center space-y-5">
              <div className="relative w-full aspect-video flex items-center justify-center">
                <svg viewBox="0 0 200 120" className="w-full h-full max-w-[360px]">
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

              <div>
                <h4 className="text-sm font-bold text-[#d4ede9]">Merkle Tree Membership</h4>
                <p className="text-xs text-[#6db5a0]/60 max-w-[280px] mx-auto mt-1.5 leading-relaxed">
                  {step === 0 && "Your deposit is computed into a Poseidon commitment leaf in an on-chain depth-4 Merkle tree."}
                  {step === 1 && "Generating local cryptographic secret parameters in WASM..."}
                  {step === 2 && "Poseidon leaf hashes established. Computing parent paths..."}
                  {step === 3 && "Broadcasting Merkle root update tree to Solana node..."}
                  {step === 4 && "Leaf committed! You can now withdraw privately using a ZK-Proof."}
                </p>
              </div>

              <div className="flex gap-3 justify-center text-xs font-mono text-[#6db5a0]/40">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#6db5a0]" /> BN254</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#6db5a0]" /> Groth16</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Solana</span>
              </div>
            </div>
          </div>
        )}

        {/* WITHDRAW TAB */}
        {activeTab === "withdraw" && (
          <div className="max-w-lg mx-auto space-y-6">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-bold text-[#6db5a0] uppercase tracking-widest block mb-2.5">Secret Note</label>
                <input
                  type="text"
                  placeholder="veil-amountsol-secretkey..."
                  className="w-full px-5 py-3.5 rounded-xl border border-white/[0.08] text-sm font-mono text-[#a8d5cc] placeholder-[#6db5a0]/20 focus:outline-none focus:border-[#599F8A] bg-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#6db5a0] uppercase tracking-widest block mb-2.5">Recipient Address</label>
                <input
                  type="text"
                  placeholder="Solana wallet address (e.g. Fv4h...)"
                  className="w-full px-5 py-3.5 rounded-xl border border-white/[0.08] text-sm font-mono text-[#a8d5cc] placeholder-[#6db5a0]/20 focus:outline-none focus:border-[#599F8A] bg-transparent"
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] p-4 flex items-start gap-3">
              <Info size={16} className="text-[#599F8A] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#6db5a0]/60 leading-relaxed">
                Withdrawals generate a fresh Groth16 ZK-Proof that verifies leaf membership without disclosing which note is spent. A public nullifier prevents double-spending.
              </p>
            </div>

            <button className={`w-full py-4 rounded-xl font-bold text-base tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2.5 ${PRIMARY}`}>
              <ShieldCheck size={18} /> Prove & Withdraw SOL
            </button>
          </div>
        )}

        {/* TRANSACTION LOGS */}
        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#6db5a0]/50 px-2 uppercase tracking-wider font-semibold">
              <span>Action / Hash</span>
              <span>Amount</span>
              <span>Time / Status</span>
            </div>
            <div className="space-y-2.5">
              {[
                { type: "Shield",   tx: "0x8fa3f2...6c1d", amount: "10.00 SOL",  time: "2 mins ago",  status: "Confirmed" },
                { type: "Withdraw", tx: "0x4be5b9...e5f2", amount: "5.00 SOL",   time: "18 mins ago", status: "Confirmed" },
                { type: "Shield",   tx: "0x69f2e3...f3a9", amount: "50.00 SOL",  time: "1 hour ago",  status: "Confirmed" },
                { type: "Withdraw", tx: "0xf5e2d1...b3e8", amount: "100.00 SOL", time: "1 day ago",   status: "Confirmed" },
              ].map((log, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] hover:border-white/[0.1] text-sm transition-colors">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      log.type === "Shield" ? "bg-[#599F8A]/10 text-[#6db5a0]" : "bg-emerald-500/10 text-emerald-400"
                    }`}>
                      <Lock size={14} />
                    </span>
                    <div>
                      <p className="font-bold text-[#a8d5cc]">{log.type} SOL</p>
                      <p className="font-mono text-xs text-[#599F8A]">{log.tx}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#a8d5cc]">{log.amount}</span>
                  <div className="text-right">
                    <p className="text-[#6db5a0]/60 font-semibold">{log.time}</p>
                    <p className="text-xs text-emerald-400 flex items-center gap-1 justify-end mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {log.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ZK CIRCUIT LOGS */}
        {activeTab === "proofs" && (
          <div className="rounded-2xl border border-white/[0.06] p-6 font-mono text-sm text-[#6db5a0]/80 overflow-x-auto h-[340px] leading-7 space-y-1 select-none">
            <p className="text-[#6db5a0]/90">{`[Groth16 WASM Engine initializing...]`}</p>
            <p className="text-[#599F8A]">{`> Loaded BN254 Elliptic Curve parameters`}</p>
            <p className="text-[#599F8A]">{`> Poseidon Hash instances: Depth 4`}</p>
            <p className="text-[#599F8A]">{`> Constraints loaded: 18,432 equations`}</p>
            <p className="text-[#599F8A]">{`> Inputs setup: secret, pathElements[4], rootNode, nullifier`}</p>
            <p className="text-[#6db5a0]">{`------------------------------------------------------------`}</p>
            <p className="text-[#8ecabb]">{`template Withdrawal(levels) {`}</p>
            <p className="text-[#6db5a0]">{`  signal private secret;                // UNKNOWN ON-CHAIN`}</p>
            <p className="text-[#6db5a0]">{`  signal private pathElements[levels];  // PATH TO MERKLE ROOT`}</p>
            <p className="text-[#6db5a0]">{`  signal commitment <== Poseidon(secret);`}</p>
            <p className="text-emerald-400 font-semibold">{`  tree.root === merkleRoot;             // Proves leaf exists! ✓`}</p>
            <p className="text-emerald-400 font-semibold">{`  n.out     === nullifier;              // Confirms valid spend! ✓`}</p>
            <p className="text-[#8ecabb]">{`}`}</p>
            <p className="text-[#6db5a0]">{`------------------------------------------------------------`}</p>
            <p className="text-emerald-400/80 animate-pulse">{`> [Ready] WASM prover fully primed. Generating proof takes ~900ms in-browser.`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
