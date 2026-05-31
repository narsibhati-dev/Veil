import { type Page, expect } from "@playwright/test";

/** Navigate to the app tab and wait for it to be interactive. */
export async function gotoApp(page: Page, tab = "shield") {
  await page.goto(`/app?tab=${tab}`);
  await page.waitForSelector('[data-testid="app-sidebar"]', { timeout: 15_000 });
}

/**
 * Seed localStorage with a known private balance so tests that check
 * balance display don't need to complete an actual on-chain shield.
 */
export async function seedBalance(page: Page, lamports: number) {
  await page.evaluate((l) => localStorage.setItem("veil_balance", String(l)), lamports);
}

/** Seed a note so the Withdraw tab can show its form. */
export async function seedNote(page: Page, sol = 0.1) {
  const note = `veil-${sol}sol-deadbeef`;
  await page.evaluate((n) => localStorage.setItem("veil_note", n), note);
  return note;
}

/** Clear all app-managed localStorage keys before each test. */
export async function clearAppStorage(page: Page) {
  await page.evaluate(() => {
    ["veil_note", "veil_balance", "veil_tx_history"].forEach((k) =>
      localStorage.removeItem(k)
    );
  });
}

/**
 * Click the Connect button, select Phantom from the wallet dropdown, then
 * wait for the wallet to report connected. The Phantom popup will appear —
 * the user must approve manually. Waits up to 60 s for approval.
 */
export async function connectPhantomWallet(page: Page) {
  // Open the wallet dropdown
  await page.locator('[data-testid="topbar"]').getByRole("button", { name: /connect/i }).click();

  // Click Phantom in the wallet list (dialog with aria-label "Connect a wallet")
  const dialog = page.getByRole("dialog", { name: /connect a wallet/i });
  await expect(dialog).toBeVisible({ timeout: 5_000 });
  await dialog.getByText(/phantom/i).click();

  // Phantom shows a popup — user must approve. Wait until the connect button
  // disappears (wallet adapter replaces it with the address pill).
  await expect(
    page.locator('[data-testid="topbar"]').getByRole("button", { name: /connect/i })
  ).not.toBeVisible({ timeout: 60_000 });
}
