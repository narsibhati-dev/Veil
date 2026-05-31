"use client";

import dynamic from "next/dynamic";

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

export default function ConnectButton() {
  return <WalletMultiButton />;
}
