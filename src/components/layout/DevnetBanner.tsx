export default function DevnetBanner() {
  return (
    <div className="w-full bg-amber-50 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] text-amber-700 text-xs text-center py-2 px-4">
      <span className="opacity-60">⚠</span>{" "}
      Devnet only — all funds are testnet SOL, no real value
    </div>
  );
}
