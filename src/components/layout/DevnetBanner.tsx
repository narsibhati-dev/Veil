export default function DevnetBanner() {
  return (
    <div className="w-full bg-amber-950/40 border-b border-amber-800/30 text-amber-400/90 text-xs text-center py-2 px-4">
      <span className="opacity-60">⚠</span>{" "}
      Devnet only — all funds are testnet SOL, no real value
    </div>
  );
}
