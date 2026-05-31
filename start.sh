#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

# ── 1. Check .env.local ───────────────────────────────────────────────────────
if [[ ! -f ".env.local" ]]; then
  echo "ERROR: .env.local not found. Create it with:"
  echo "  NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com"
  echo "  NEXT_PUBLIC_RELAYER_API_URL=https://api3.privacycash.org"
  echo "  NEXT_PUBLIC_PROGRAM_ID=ATZj4jZ4FFzkvAcvk27DW9GRkgSbFnHo49fKKPQXU7VS"
  exit 1
fi

# ── 2. Check node_modules ─────────────────────────────────────────────────────
if [[ ! -d "node_modules" ]]; then
  echo "→ Installing dependencies..."
  npm install
fi

# ── 3. Ensure circuit files are present ───────────────────────────────────────
WASM="public/circuit2/transaction2.wasm"
ZKEY="public/circuit2/transaction2.zkey"

if [[ ! -f "$WASM" || ! -f "$ZKEY" ]]; then
  echo "→ Copying circuit files to public/circuit2/..."
  mkdir -p public/circuit2
  cp node_modules/privacycash/circuit2/transaction2.wasm public/circuit2/
  cp node_modules/privacycash/circuit2/transaction2.zkey  public/circuit2/
fi

echo "  ✓ transaction2.wasm  ($(du -sh "$WASM" | cut -f1))"
echo "  ✓ transaction2.zkey  ($(du -sh "$ZKEY" | cut -f1))"

# ── 4. Ensure Poseidon WASM files are where @lightprotocol/hasher.rs expects them
HASHER_DIR="node_modules/@lightprotocol/hasher.rs/dist/browser-fat/es"
SIMD_WASM="node_modules/@lightprotocol/hasher.rs/dist/hasher_wasm_simd_bg.wasm"
LIGHT_WASM="node_modules/@lightprotocol/hasher.rs/dist/light_wasm_hasher_bg.wasm"

if [[ -f "$SIMD_WASM" && ! -f "$HASHER_DIR/hasher_wasm_simd_bg.wasm" ]]; then
  echo "→ Copying Poseidon WASM to browser-fat/es/..."
  mkdir -p "$HASHER_DIR"
  cp "$SIMD_WASM"  "$HASHER_DIR/"
  cp "$LIGHT_WASM" "$HASHER_DIR/"
fi

# ── 5. Start dev server ───────────────────────────────────────────────────────
echo ""
echo "  Starting Veil dev server → http://localhost:3000"
echo "  Connect a Phantom/Solflare wallet funded with devnet SOL"
echo "  Proof generation (Withdraw) loads ~16 MB on first use — this is normal"
echo ""

exec bun dev
