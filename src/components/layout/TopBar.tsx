"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { NETWORK_LABEL } from "@/lib/constants";

export default function TopBar() {
  return (
    <header className="border-b border-[#1e293b] bg-[#080b14]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00d4a0] flex items-center justify-center">
            <span className="text-[#080b14] font-black text-sm">O</span>
          </div>
          <span className="font-bold text-[#f1f5f9] text-lg tracking-tight">
            Obscura
          </span>
          <span className="px-2 py-0.5 text-xs font-medium bg-[#0f1629] border border-[#1e293b] rounded-full text-[#00d4a0]">
            {NETWORK_LABEL}
          </span>
        </div>
        <WalletMultiButton />
      </div>
    </header>
  );
}
