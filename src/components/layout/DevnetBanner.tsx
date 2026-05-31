export default function DevnetBanner() {
  return (
    <div data-testid="devnet-banner" className="w-full bg-amber-50 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] text-amber-700 text-xs text-center py-2 px-4">
      <span className="opacity-60">⚠</span>{" "}
      Devnet only. All funds are testnet SOL, no real value
    </div>
  );
}
