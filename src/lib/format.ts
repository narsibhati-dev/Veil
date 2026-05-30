export function shortenAddress(addr: string, chars = 4): string {
  return `${addr.slice(0, chars)}...${addr.slice(-chars)}`;
}

export function lamportsToSol(lamports: number): number {
  return lamports / 1_000_000_000;
}

export function solToLamports(sol: number): number {
  return Math.floor(sol * 1_000_000_000);
}

export function formatSol(lamports: number, decimals = 4): string {
  return lamportsToSol(lamports).toFixed(decimals);
}
