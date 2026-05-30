"use client";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { NETWORK_LABEL } from "@/lib/constants";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-[12px] bg-gradient-to-tr from-[#599F8A] to-[#3d7a68] shadow-md">
            <span className="font-extrabold text-white text-lg tracking-tighter" style={{ fontFamily: "var(--font-raleway)" }}>O</span>
            <div className="absolute inset-0.5 rounded-[10px] border border-white/20 pointer-events-none" />
          </div>

          <span className="text-xl font-extrabold text-[#0f1a16] tracking-tight" style={{ fontFamily: "var(--font-raleway)" }}>
            Obscura
          </span>

          <span
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f7fbf9] shadow-[0_0_0_1px_rgba(89,159,138,0.25)] text-[#599F8A]"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {NETWORK_LABEL}
          </span>
        </Link>

        <WalletMultiButton />
      </div>
    </header>
  );
}
