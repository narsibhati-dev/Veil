# Veil: Private Payments on Solana

Veil is a devnet demo of zero-knowledge private SOL transfers built on the Privacy Cash SDK. Deposit SOL into a shared privacy pool, then prove ownership and withdraw to any address without linking the sender and recipient on-chain. Built with Next.js 16, React 19, and Tailwind CSS v4.

---

## Setup

### Requirements

- **Node.js 24** - required. Earlier versions can cause WASM loading failures with the Rust-compiled hasher. Use `nvm install 24 && nvm use 24` if needed.
- **bun** - package manager. Install from [bun.sh](https://bun.sh).

### Install

```bash
bun install
```

The `postinstall` script runs automatically. It copies two WASM files from `@lightprotocol/hasher.rs` into the location the browser bundler expects:

```
node_modules/@lightprotocol/hasher.rs/dist/hasher_wasm_simd_bg.wasm
  → dist/browser-fat/es/

node_modules/@lightprotocol/hasher.rs/dist/light_wasm_hasher_bg.wasm
  → dist/browser-fat/es/
```

If the copy is skipped (e.g. bun blocked it as untrusted), run it manually:

```bash
bun run postinstall
```

Without this step the Poseidon hasher will fail to load in the browser with a module-not-found error before any of your code runs.

### Environment variables

```bash
cp .env_sample .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_RPC_URL` | Solana devnet RPC endpoint. Default: `https://api.devnet.solana.com` |
| `NEXT_PUBLIC_RELAYER_URL` | Privacy Cash relayer URL (from SDK README) |
| `NEXT_PUBLIC_PROGRAM_ID` | Privacy Cash program ID on devnet (from SDK README) |

---

## Running

```bash
bun run dev
```

The dev command runs `next dev --webpack`. **The `--webpack` flag is intentional.** Next.js 16 defaults to Turbopack, but Turbopack does not yet support the `ProvidePlugin` Buffer injection or `experiments.asyncWebAssembly` that Solana libraries require. Webpack handles both cleanly. Do not remove this flag.

Production build:

```bash
bun run build && bun run start
```

---

## Wiring the Privacy Cash SDK

All SDK calls live in `src/lib/privacyCash.ts`. Every function currently throws a "not wired" error so the UI builds and runs before the SDK is integrated. When you have the package name:

```bash
bun add <sdk-package-name>
```

Then open `src/lib/privacyCash.ts`, uncomment the import, and replace each function body. The three function signatures the app expects:

```typescript
// Shield: returns the private note (user's secret) and the tx signature
deposit(
  wallet: WalletContextState,
  amountLamports: number
): Promise<{ note: string; signature: string }>

// Withdraw: generates a Groth16 proof client-side, submits via relayer
withdraw(
  wallet: WalletContextState,
  note: string,
  recipientAddress: string
): Promise<{ signature: string; proof: ProofData }>

// Balance: returns shielded balance in lamports for the given note
getPrivateBalance(
  wallet: WalletContextState,
  note: string
): Promise<number>
```

Nothing else imports the SDK directly. Every call goes through this file.

---

## How the Privacy Works

**Shielding.** When you deposit SOL, the SDK generates a random secret and computes a *commitment*, a Poseidon hash of that secret. The commitment is submitted to an on-chain program which appends it as a leaf in a Merkle tree. Your SOL enters the shared pool. Because the on-chain record is only the commitment (a hash), there is no link between the deposit transaction and your wallet address.

**Withdrawing.** To withdraw, the SDK constructs a *zero-knowledge proof* using the Groth16 proving system (run in-browser via WASM (this is the multi-second step). The proof attests that you know the secret for *some valid leaf* in the Merkle tree, without revealing *which* leaf. A *nullifier*, another deterministic hash of your secret - is submitted alongside the proof. The on-chain verifier checks: (1) the Groth16 proof is valid against the current Merkle root, (2) the nullifier has not been used before. If both pass, the funds are released to the recipient.

**Why it's private.** The ZK proof only proves membership in the tree. It reveals nothing about which deposit is being spent. With many depositors sharing the pool, an observer cannot determine which withdrawal corresponds to which deposit. The nullifier mechanism prevents double-spending without creating any on-chain link between the shield and withdraw transactions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router, webpack mode) |
| UI | React 19 + React Compiler |
| Styling | Tailwind CSS v4 |
| Wallet | @solana/wallet-adapter (Phantom, Solflare) |
| ZK Hasher | @lightprotocol/hasher.rs (WASM Poseidon) |
| Language | TypeScript 5 |
| Fonts | Syne, Space Mono, Geist |
| Package manager | bun |
