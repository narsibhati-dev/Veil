"use client";

import { useCallback, useMemo, type ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { DEVNET_RPC_URL } from "@/lib/constants";

// Errors that fire when the user dismisses/cancels the wallet popup — not real failures
const USER_CANCEL_ERRORS = new Set([
  "WalletConnectionError",
  "WalletWindowClosedError",
  "WalletUserRejectError",
  "WalletNotConnectedError",
]);

export default function Providers({ children }: { children: ReactNode }) {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  const handleWalletError = useCallback((error: Error) => {
    if (USER_CANCEL_ERRORS.has(error.name)) return;
    console.warn("[Wallet]", error.message);
  }, []);

  return (
    <ConnectionProvider endpoint={DEVNET_RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect onError={handleWalletError}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
