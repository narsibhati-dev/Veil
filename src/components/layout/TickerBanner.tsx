"use client";

export default function TickerBanner() {
  const items = [
    "ZERO-KNOWLEDGE PRIVACY ON SOLANA",
    "SECURE & UNTRACEABLE",
    "GROTH16 PROVING SYSTEM",
    "POSEIDON HASH FUNCTION",
    "BN254 ELLIPTIC CURVE",
    "100% IN-BROWSER WASM PROOF GENERATION",
    "UNLINKABLE TRANSACTIONS",
    "DEPOSIT SOL • WITHDRAW TO ANY WALLET",
    "ZERO LINKED GRAPH DATA",
  ];

  // Repeat items to ensure seamless infinite looping when width scrolls
  const tickerText = [...items, ...items, ...items].map((text, idx) => (
    <span key={idx} className="inline-flex items-center gap-3.5 mx-6">
      <span className="w-1.5 h-1.5 rounded-full bg-[#599F8A] animate-pulse" />
      <span className="text-[10px] font-bold tracking-widest text-[#5e8a83] whitespace-nowrap uppercase" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
        {text}
      </span>
    </span>
  ));

  return (
    <div className="w-full bg-[#f7fbf9] shadow-[0_1px_0_0_rgba(0,0,0,0.06)] h-8 flex items-center overflow-hidden select-none relative z-50">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f7fbf9] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f7fbf9] to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-marquee whitespace-nowrap py-1">
        <div className="flex items-center">
          {tickerText}
        </div>
      </div>
    </div>
  );
}
