import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false, // dApp tests share wallet state — run sequentially
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    // Record traces on first retry for easier debugging
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // Generous timeouts — shield/withdraw involve ZK proof generation
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  // Default assertion timeout (expect.toBeVisible etc.) — 10 s gives React
  // enough time to process state updates in the dev server environment.
  expect: { timeout: 10_000 },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Dev server must already be running; we don't spawn it here because
  // `bun run dev` takes >30 s on first compile with the Solana WASM deps.
  // Run `./start.sh` before running the tests.
  webServer: undefined,
});
