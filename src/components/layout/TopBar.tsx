"use client";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { NETWORK_LABEL } from "@/lib/constants";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1e1e3a] bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <svg
            width="36"
            height="36"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            {/* Octagon */}
            <polygon
              points="12,1 28,1 39,12 39,28 28,39 12,39 1,28 1,12"
              fill="url(#logoGrad)"
            />
            {/* Letter O */}
            <text
              x="20"
              y="27"
              textAnchor="middle"
              fontSize="20"
              fontWeight="800"
              fill="white"
              fontFamily="sans-serif"
              letterSpacing="-1"
            >
              O
            </text>
          </svg>

          <span
            className="text-xl font-extrabold text-[#f1f5f9] tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Obscura
          </span>

          <span
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#161626] border border-[#6366f1]/30 text-[#6366f1]"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {NETWORK_LABEL}
          </span>
        </Link>

        <WalletMultiButton />
      </div>
    </header>
  );
}
