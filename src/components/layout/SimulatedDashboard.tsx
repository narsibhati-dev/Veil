"use client";

import { useState, useEffect } from "react";
import {
  Layers, Lock, History, Cpu, Wallet,
  Coins, ArrowRight, ShieldCheck, Check, Info
} from "lucide-react";

type MockTab = "shield" | "withdraw" | "history" | "proofs";

export default function SimulatedDashboard() {
  const [activeTab, setActiveTab] = useState<MockTab>("shield");
  const [depositAmount, setDepositAmount] = useState<number>(10);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [commitment, setCommitment] = useState<string>("0x8b3af...9f2e");
  const [secret, setSecret] = useState<string>("obscura-10sol-8af2...6c1d");
  const [step, setStep] = useState<number>(0);

  // Auto-generate commitments on changing amount to feel highly dynamic
  useEffect(() => {
    const hex = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setCommitment(`0x${hex.slice(0, 6)}...${hex.slice(-4)}`);
    setSecret(`obscura-${depositAmount}sol-${hex.slice(0, 10)}...${hex.slice(-6)}`);
  }, [depositAmount]);

  // Simulate ZK-Proof generation when Shielding
  const triggerSimulateShield = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setStep(1);

    setTimeout(() => setStep(2), 1200);
    setTimeout(() => setStep(3), 2400);
    setTimeout(() => {
      setStep(4);
      setIsGenerating(false);
    }, 3800);
  };

  return (
    <div className="w-full rounded-[28px] glass-card overflow-hidden transition-all duration-300">

      {/* 1. Mock Dashboard Header */}
      <div className="px-6 py-4 border-b border-[#0e1c18]/40 bg-[#0e1c18]/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Mock Logo / Branding */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#599F8A] to-[#599F8A] shadow-md">
            <span className="font-extrabold text-white text-base tracking-tighter">O</span>
            <div className="absolute inset-0.5 rounded-[10px] border border-white/20 pointer-events-none" />
          </div>
          <span className="text-base font-extrabold text-[#e8f5f2] tracking-wider uppercase" style={{ fontFamily: "var(--font-raleway)" }}>
            Obscura <span className="text-[10px] font-mono font-normal tracking-normal text-[#6db5a0]/80 lowercase bg-[#599F8A]/10 border border-[#599F8A]/20 px-1.5 py-0.5 rounded ml-1">v1.0-dev</span>
          </span>
        </div>

        {/* Mock Top bar Stats */}
        <div className="flex items-center flex-wrap gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1c18]/20 border border-[#162e26]/20 text-[#8ecabb]">
            <Wallet size={12} className="text-[#6db5a0]" />
            <span className="text-[#6db5a0]/60 uppercase">Balance:</span>
            <span className="font-bold text-[#e8f5f2]">1,248.50 SOL</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1c18]/20 border border-[#162e26]/20 text-[#8ecabb]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6db5a0] shadow-[0_0_6px_#6db5a0] animate-pulse" />
            <span className="text-[#6db5a0]/60 uppercase">Tier:</span>
            <span className="font-bold text-[#e8f5f2]">GOLD TIER <span className="text-[#6db5a0]">(9.4K PTS)</span></span>
          </div>

          <button className="px-3.5 py-1.5 rounded-xl bg-[#599F8A] hover:bg-[#2d5e50] text-white font-sans font-semibold transition-all duration-200 shadow-sm border border-[#599F8A]/40">
            Add Funds
          </button>
        </div>
      </div>

      {/* 2. Inner Navigation Tabs */}
      <div className="px-6 border-b border-[#0e1c18]/40 bg-[#0e1c18]/[0.01] flex items-center overflow-x-auto gap-1">
        {[
          { id: "shield", label: "Shield SOL", icon: Lock },
          { id: "withdraw", label: "Private Withdraw", icon: ShieldCheck },
          { id: "history", label: "Transaction Logs", icon: History },
          { id: "proofs", label: "ZK Circuit Logs", icon: Cpu },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MockTab)}
              className={`px-5 py-4 border-b-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? "border-[#599F8A] text-[#8ecabb] bg-[#599F8A]/[0.03]"
                  : "border-transparent text-[#6db5a0]/50 hover:text-[#8ecabb]/80"
              }`}
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              <Icon size={14} className={isActive ? "text-[#6db5a0]" : "text-[#6db5a0]/40"} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Panel Body */}
      <div className="p-6 md:p-8 min-h-[350px]">
        {/* SHIELD TAB */}
        {activeTab === "shield" && (
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Input Form Column */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#6db5a0] uppercase tracking-widest flex items-center gap-1.5">
                    <Coins size={14} className="text-[#599F8A]" /> Deposit Amount
                  </label>
                  <span className="text-[10px] font-mono text-[#599F8A]/80">Solana Devnet Pool</span>
                </div>

                {/* Amount Quick Selectors */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 5, 10, 50].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => !isGenerating && setDepositAmount(amt)}
                      className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all duration-200 ${
                        depositAmount === amt && !isGenerating
                          ? "bg-[#599F8A]/15 border-[#599F8A]/60 text-[#8ecabb] shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                          : "bg-[#0e1c18]/[0.05] border-[#0e1c18]/60 text-[#6db5a0]/70 hover:border-[#162e26] hover:text-[#8ecabb]"
                      }`}
                    >
                      {amt} SOL
                    </button>
                  ))}
                </div>

                {/* Main Interactive Form Fields */}
                <div className="rounded-2xl border border-[#0e1c18] bg-[#0e1c18]/[0.08] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6db5a0]/60">Asset</span>
                    <span className="font-mono text-[#8ecabb]">SOL (Solana)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6db5a0]/60">Poseidon Commitment</span>
                    <span className="font-mono text-[#6db5a0] text-[10px]">{commitment}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6db5a0]/60">Secret Note (Key)</span>
                    <span className="font-mono text-[#599F8A] text-[10px] select-all cursor-pointer hover:text-[#6db5a0] transition-colors">
                      {secret}
                    </span>
                  </div>
                </div>
              </div>

              {/* Console logs showing active cryptogaphy */}
              <div className="rounded-xl bg-[#04110b] border border-[#0e1c18]/60 p-3 h-28 font-mono text-[9px] leading-relaxed text-[#6db5a0]/80 overflow-y-auto space-y-1 select-none">
                <p className="text-[#599F8A]/90 font-semibold">{`// Cryptographic log console`}</p>
                {step === 0 && <p className="text-[#6db5a0]/50">{`> Waiting for shield initialization...`}</p>}
                {step >= 1 && <p className="text-[#6db5a0]">{`> [WASM] Generating Poseidon secret note: ${secret}`}</p>}
                {step >= 2 && <p className="text-[#6db5a0]">{`> [WASM] Hashing commitment: Hash(${secret.slice(0, 15)}...) = ${commitment}`}</p>}
                {step >= 3 && <p className="text-purple-400">{`> [SOL] Submitting deposit transaction to lightprotocol contract...`}</p>}
                {step >= 4 && <p className="text-emerald-400 font-semibold">{`✓ Success! Transaction confirmed. SOL added to privacy pool. Note saved to local storage.`}</p>}
              </div>

              {/* Glossy trigger button */}
              <button
                onClick={triggerSimulateShield}
                disabled={isGenerating || step === 4}
                className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 relative group overflow-hidden border border-[#599F8A] bg-[#599F8A] text-white shadow-[0_4px_20px_rgba(89,159,138,0.25),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-[#599F8A] disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isGenerating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Shielding SOL...
                    </>
                  ) : step === 4 ? (
                    <>
                      <Check size={16} className="text-emerald-300" />
                      Shield Complete
                    </>
                  ) : (
                    <>
                      Shield {depositAmount} SOL
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>

                {/* Micro-glow pulse backdrop */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#599F8A] to-[#599F8A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            </div>

            {/* ZK Visualizer Column */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#0e1c18] bg-[#0e1c18]/[0.04] p-6 text-center space-y-4">
              <div className="relative w-full aspect-video flex items-center justify-center">
                {/* Simulated Merkle Tree SVG */}
                <svg viewBox="0 0 200 120" className="w-full h-full max-w-[280px]">
                  {/* Root Node */}
                  <circle cx="100" cy="20" r="8" className={`fill-[#04110b] stroke-2 ${step >= 3 ? "stroke-emerald-400" : "stroke-[#599F8A]"}`} />
                  <text x="100" y="23" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">R</text>

                  {/* Lines to level 1 */}
                  <line x1="100" y1="20" x2="60" y2="50" className={`stroke-2 ${step >= 3 ? "stroke-emerald-500/80" : "stroke-[#162e26]/60"}`} />
                  <line x1="100" y1="20" x2="140" y2="50" className="stroke-[#162e26]/20 stroke-1" />

                  {/* Level 1 Nodes */}
                  <circle cx="60" cy="50" r="7" className={`fill-[#04110b] stroke-2 ${step >= 2 ? "stroke-[#6db5a0]" : "stroke-[#162e26]/60"}`} />
                  <circle cx="140" cy="50" r="7" className="fill-[#04110b] stroke-[#162e26]/20 stroke-1" />

                  {/* Lines to level 2 */}
                  <line x1="60" y1="50" x2="40" y2="80" className={`stroke-2 ${step >= 2 ? "stroke-[#599F8A]/80" : "stroke-[#162e26]/40"}`} />
                  <line x1="60" y1="50" x2="80" y2="80" className="stroke-[#162e26]/20 stroke-1" />

                  {/* Level 2 Nodes */}
                  <circle cx="40" cy="80" r="6" className={`fill-[#04110b] stroke-2 ${step >= 2 ? "stroke-[#6db5a0]" : "stroke-[#162e26]/40"}`} />
                  <circle cx="80" cy="80" r="6" className="fill-[#04110b] stroke-[#162e26]/20 stroke-1" />
                  <circle cx="120" cy="80" r="6" className="fill-[#04110b] stroke-[#162e26]/20 stroke-1" />
                  <circle cx="160" cy="80" r="6" className="fill-[#04110b] stroke-[#162e26]/20 stroke-1" />

                  {/* Lines to Leaves */}
                  <line x1="40" y1="80" x2="30" y2="105" className={`stroke-2 ${step >= 1 ? "stroke-[#6db5a0]" : "stroke-[#0e1c18]"}`} />
                  <line x1="40" y1="80" x2="50" y2="105" className="stroke-[#0e1c18] stroke-1" />

                  {/* Leaves */}
                  <circle cx="30" cy="105" r="5" className={`fill-[#04110b] stroke-2 ${step >= 1 ? "stroke-[#8ecabb]" : "stroke-[#0e1c18]"}`} />
                  <circle cx="50" cy="105" r="5" className="fill-[#04110b] stroke-[#0e1c18] stroke-1" />
                  <circle cx="70" cy="105" r="5" className="fill-[#04110b] stroke-[#0e1c18] stroke-1" />
                  <circle cx="90" cy="105" r="5" className="fill-[#04110b] stroke-[#0e1c18] stroke-1" />

                  {/* Highlight Path Element glow */}
                  {step >= 1 && (
                    <g className="animate-pulse">
                      <circle cx="30" cy="105" r="8" className="fill-transparent stroke-[#6db5a0]/40 stroke-1" />
                    </g>
                  )}
                  {step >= 2 && (
                    <g className="animate-pulse">
                      <circle cx="40" cy="80" r="9" className="fill-transparent stroke-[#6db5a0]/40 stroke-1" />
                      <circle cx="60" cy="50" r="10" className="fill-transparent stroke-[#6db5a0]/40 stroke-1" />
                    </g>
                  )}
                  {step >= 3 && (
                    <g className="animate-pulse">
                      <circle cx="100" cy="20" r="12" className="fill-transparent stroke-emerald-400/40 stroke-1" />
                    </g>
                  )}
                </svg>

                {/* Floating particle simulations overlay */}
                {isGenerating && (
                  <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute w-2.5 h-2.5 rounded-sm bg-[#6db5a0] animate-ping left-[15%] bottom-[15%]" />
                    <span className="absolute w-2 h-2 rounded-sm bg-[#6db5a0] animate-ping left-[20%] top-[35%] [animation-delay:0.5s]" />
                    <span className="absolute w-1.5 h-1.5 rounded-sm bg-emerald-400 animate-ping left-[48%] top-[12%] [animation-delay:1.2s]" />
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#d4ede9] flex items-center justify-center gap-1.5">
                  Merkle Tree Membership
                </h4>
                <p className="text-[10px] text-[#6db5a0]/60 max-w-[240px] mx-auto mt-1 leading-relaxed">
                  {step === 0 && "Your deposit is computed into a Poseidon commitment leaf in an on-chain depth-4 Merkle tree."}
                  {step === 1 && "Generating local cryptographic secret parameters in WASM..."}
                  {step === 2 && "Poseidon leaf hashes established. Computing parent paths..."}
                  {step === 3 && "Broadcasting Merkle root update tree to Solana node..."}
                  {step === 4 && "Leaf committed! You can now withdraw privately using a ZK-Proof proving membership of this leaf."}
                </p>
              </div>

              {/* Status info bar */}
              <div className="flex gap-2 justify-center text-[9px] font-mono text-[#6db5a0]/40">
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-[#6db5a0]" /> BN254</span>
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-[#6db5a0]" /> Groth16</span>
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-400" /> Solana</span>
              </div>
            </div>
          </div>
        )}

        {/* WITHDRAW TAB */}
        {activeTab === "withdraw" && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#6db5a0] uppercase tracking-widest block mb-2">
                  Secret Note
                </label>
                <input
                  type="text"
                  placeholder="obscura-amountsol-secretkey..."
                  className="w-full px-4 py-3 rounded-xl border border-[#0e1c18] bg-[#0e1c18]/[0.05] text-xs font-mono text-[#a8d5cc] placeholder-[#6db5a0]/20 focus:outline-none focus:border-[#599F8A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6db5a0] uppercase tracking-widest block mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  placeholder="Solana wallet address (e.g. Fv4h...)"
                  className="w-full px-4 py-3 rounded-xl border border-[#0e1c18] bg-[#0e1c18]/[0.05] text-xs font-mono text-[#a8d5cc] placeholder-[#6db5a0]/20 focus:outline-none focus:border-[#599F8A]"
                />
              </div>
            </div>

            <div className="rounded-xl bg-[#04110b] border border-[#0e1c18]/60 p-3.5 flex items-start gap-2.5">
              <Info size={14} className="text-[#599F8A] flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#6db5a0]/60 leading-normal">
                Withdrawals generate a fresh Groth16 ZK-Proof that verifies leaf membership without disclosing which note is spent. A public nullifier prevents double-spending.
              </p>
            </div>

            <button className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 border border-[#599F8A] bg-[#599F8A] text-white shadow-[0_4px_20px_rgba(89,159,138,0.25),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-[#599F8A] flex items-center justify-center gap-2">
              <ShieldCheck size={16} /> Prove & Withdraw SOL
            </button>
          </div>
        )}

        {/* TRANSACTION LOGS */}
        {activeTab === "history" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-[#6db5a0]/50 px-2 uppercase tracking-wider font-semibold">
              <span>Action / Hash</span>
              <span>Amount</span>
              <span>Time / Status</span>
            </div>

            <div className="space-y-2">
              {[
                { type: "Shield", tx: "0x8fa3f2...6c1d", amount: "10.00 SOL", time: "2 mins ago", status: "Confirmed" },
                { type: "Withdraw", tx: "0x4be5b9...e5f2", amount: "5.00 SOL", time: "18 mins ago", status: "Confirmed" },
                { type: "Shield", tx: "0x69f2e3...f3a9", amount: "50.00 SOL", time: "1 hour ago", status: "Confirmed" },
                { type: "Withdraw", tx: "0xf5e2d1...b3e8", amount: "100.00 SOL", time: "1 day ago", status: "Confirmed" },
              ].map((log, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-[#0e1c18]/60 bg-[#0e1c18]/[0.04] text-xs hover:border-[#162e26] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      log.type === "Shield" ? "bg-[#599F8A]/10 text-[#6db5a0]" : "bg-emerald-500/10 text-emerald-400"
                    }`}>
                      <Lock size={12} />
                    </span>
                    <div>
                      <p className="font-bold text-[#a8d5cc]">{log.type} SOL</p>
                      <p className="font-mono text-[10px] text-[#599F8A]">{log.tx}</p>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-[#a8d5cc]">{log.amount}</span>

                  <div className="text-right">
                    <p className="text-[#6db5a0]/60 font-semibold">{log.time}</p>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1 justify-end">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" /> {log.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ZK CIRCUIT LOGS */}
        {activeTab === "proofs" && (
          <div className="rounded-2xl border border-[#0e1c18] bg-[#04110b] p-5 font-mono text-xs text-[#6db5a0]/80 overflow-x-auto h-[260px] leading-6 space-y-1 select-none">
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
