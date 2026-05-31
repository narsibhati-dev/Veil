"use client";

import { useCallback, useMemo, type ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { DEVNET_RPC_URL } from "@/lib/constants";

// Suppress the wasm-bindgen cosmetic warning that fires because webpack's asyncWebAssembly
// passes a WebAssembly.Module directly to the init fn instead of wrapping it in an object.
// Must be set at module scope so it's in place before any async chunk/WASM loading begins.
if (typeof window !== "undefined") {
  const _origWarn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].startsWith("using deprecated parameters for the initialization function")
    ) return;
    _origWarn(...args);
  };
}

// Errors that are expected / benign — do not surface to the user
const SILENT_WALLET_ERRORS = new Set([
  "WalletWindowClosedError",
  "WalletUserRejectError",
  "WalletConnectionError",
  "WalletNotConnectedError",
  "WalletNotReadyError",      // extension not yet loaded / not installed
  "WalletNotSelectedError",   // autoConnect with no previously-selected wallet
  "WalletDisconnectedError",
  "WalletAccountError",
  "WalletSignMessageError",   // user cancelled / rejected the sign-message prompt
]);

export default function Providers({ children }: { children: ReactNode }) {
  // Phantom and other Standard Wallet-compatible extensions self-register via the
  // Wallet Standard API — explicit PhantomWalletAdapter not needed.
  // Solflare is kept for wallets that have not yet adopted Standard Wallet.
  const wallets = useMemo(() => [new SolflareWalletAdapter()], []);

  const handleWalletError = useCallback((error: Error) => {
    if (SILENT_WALLET_ERRORS.has(error.name)) return;
    console.warn("[Wallet]", error.name, error.message);
  }, []);

  return (
    <ConnectionProvider endpoint={DEVNET_RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect onError={handleWalletError}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
