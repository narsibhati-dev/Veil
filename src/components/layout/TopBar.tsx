"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { NETWORK_LABEL } from "@/lib/constants";
import LogoIcon from "@/components/ui/LogoIcon";

// ssr: false prevents server/client HTML mismatch — wallet state only exists on the client
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((m) => m.WalletMultiButton),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-[130px] rounded-xl bg-[#f0f8f5] animate-pulse" />
    ),
  }
);

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <LogoIcon size={36} />

          <span className="text-xl font-extrabold text-[#0f1a16] tracking-tight" style={{ fontFamily: "var(--font-raleway)" }}>
            Veil
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
