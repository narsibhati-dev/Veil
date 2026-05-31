import { test, expect, type Page } from "@playwright/test";
import { gotoApp, seedBalance, seedNote, clearAppStorage, connectPhantomWallet } from "./helpers";

// ─── Layout & page load ───────────────────────────────────────────────────────

test.describe("Page load", () => {
  test("app route loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await gotoApp(page);
    expect(errors.filter((e) => !e.includes("ChunkLoadError"))).toHaveLength(0);
  });

  test("devnet banner is visible", async ({ page }) => {
    await gotoApp(page);
    const banner = page.locator('[data-testid="devnet-banner"]');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("Devnet");
  });

  test("top bar renders with logo", async ({ page }) => {
    await gotoApp(page);
    await expect(page.locator('[data-testid="topbar"]')).toBeVisible();
    // The logo text "Veil" or "Obscura" should appear
    await expect(page.locator('[data-testid="topbar"]')).toContainText(/Veil|Obscura/i);
  });

  test("balance card is present", async ({ page }) => {
    await gotoApp(page);
    await expect(page.locator('[data-testid="balance-card"]')).toBeVisible();
  });

  test("sidebar with all tabs is visible", async ({ page }) => {
    await gotoApp(page);
    const sidebar = page.locator('[data-testid="app-sidebar"]');
    await expect(sidebar).toBeVisible();
    for (const tab of ["shield", "withdraw", "history"]) {
      await expect(sidebar.locator(`[data-testid="tab-${tab}"]`)).toBeVisible();
    }
  });
});

// ─── Balance card ─────────────────────────────────────────────────────────────

test.describe("Balance card display", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/app");
    await clearAppStorage(page);
  });

  test("shows em-dash placeholder when no wallet and no cached balance", async ({ page }) => {
    await gotoApp(page);
    // No wallet connected, no cached balance → shows "–.––––"
    const balanceText = page.locator('[data-testid="balance-value"]');
    await expect(balanceText).toBeVisible();
    await expect(balanceText).toContainText("–");
  });

  test("shows cached balance immediately on page load without wallet", async ({ page }) => {
    // Seed balance BEFORE navigating so it's available on mount hydration
    await page.goto("/app");
    await seedBalance(page, 100_000_000); // 0.1 SOL
    await page.reload();
    await page.waitForSelector('[data-testid="balance-card"]');

    const balanceText = page.locator('[data-testid="balance-value"]');
    await expect(balanceText).toContainText("0.1000");
  });

  test("no loading skeleton when balance is already known", async ({ page }) => {
    await page.goto("/app");
    await seedBalance(page, 500_000_000); // 0.5 SOL
    await page.reload();
    await page.waitForSelector('[data-testid="balance-card"]');

    // Skeleton should never be visible when a balance value is cached
    await expect(page.locator('[data-testid="balance-skeleton"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="balance-value"]')).toContainText("0.5000");
  });

  test("updates balance display correctly for different amounts", async ({ page }) => {
    const amounts = [
      { lamports: 50_000_000, expected: "0.0500" },
      { lamports: 1_000_000_000, expected: "1.0000" },
      { lamports: 123_456_789, expected: "0.1235" },
    ];
    for (const { lamports, expected } of amounts) {
      await page.goto("/app");
      await seedBalance(page, lamports);
      await page.reload();
      await page.waitForSelector('[data-testid="balance-value"]');
      await expect(page.locator('[data-testid="balance-value"]')).toContainText(expected);
    }
  });
});

// ─── Tab navigation ───────────────────────────────────────────────────────────

test.describe("Tab navigation", () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page);
  });

  test("shield tab is active by default", async ({ page }) => {
    const shieldTab = page.locator('[data-testid="tab-shield"]');
    await expect(shieldTab).toHaveAttribute("aria-selected", "true");
    await expect(page.locator('[data-testid="shield-panel"]')).toBeVisible();
  });

  test("switching to withdraw tab shows withdraw panel", async ({ page }) => {
    // Retry the click until React has hydrated and the panel becomes visible
    await expect(async () => {
      await page.locator('[data-testid="tab-withdraw"]').click();
      await expect(page.locator('[data-testid="withdraw-panel"]')).toBeVisible({ timeout: 3_000 });
    }).toPass({ timeout: 20_000 });
    await expect(page.url()).toContain("tab=withdraw");
  });

  test("switching to history tab shows history panel", async ({ page }) => {
    await expect(async () => {
      await page.locator('[data-testid="tab-history"]').click();
      await expect(page.locator('[data-testid="history-panel"]')).toBeVisible({ timeout: 3_000 });
    }).toPass({ timeout: 20_000 });
    await expect(page.url()).toContain("tab=history");
  });

  test("direct URL navigation to a tab loads the correct panel", async ({ page }) => {
    // Navigate directly to the history tab via URL — tab state is in the URL param
    await page.goto("/app?tab=history");
    await page.waitForSelector('[data-testid="app-sidebar"]', { timeout: 15_000 });
    await expect(page.locator('[data-testid="history-panel"]')).toBeVisible();
    await expect(page.locator('[data-testid="tab-history"]')).toHaveAttribute("aria-selected", "true");
  });
});

// ─── Shield panel ─────────────────────────────────────────────────────────────

test.describe("Shield panel UI", () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, "shield");
  });

  test("amount input is present and accepts numbers", async ({ page }) => {
    const input = page.locator('[data-testid="shield-amount-input"]');
    await expect(input).toBeVisible();
    await input.fill("0.5");
    await expect(input).toHaveValue("0.5");
  });

  test("preset buttons update the amount input", async ({ page }) => {
    for (const preset of ["0.05", "0.1", "0.5", "1"]) {
      // Retry each click until React is hydrated and the value updates
      await expect(async () => {
        await page.locator(`[data-testid="preset-${preset}"]`).click();
        await expect(page.locator('[data-testid="shield-amount-input"]')).toHaveValue(preset, { timeout: 3_000 });
      }).toPass({ timeout: 20_000 });
    }
  });

  test("shield button is disabled when no wallet connected", async ({ page }) => {
    const btn = page.locator('[data-testid="shield-submit-btn"]');
    await expect(btn).toBeDisabled();
  });

  test("shield button shows amount placeholder when no wallet", async ({ page }) => {
    // Without a wallet connected the button says "Connect Wallet to Shield" regardless of amount
    await page.locator('[data-testid="shield-amount-input"]').fill("0.25");
    await expect(page.locator('[data-testid="shield-submit-btn"]')).toContainText(/Connect Wallet/i);
    await expect(page.locator('[data-testid="shield-submit-btn"]')).toBeDisabled();
  });

  test("summary rows display pool and fee info", async ({ page }) => {
    const panel = page.locator('[data-testid="shield-panel"]');
    await expect(panel).toContainText(/Devnet|devnet/i);
    await expect(panel).toContainText(/fee/i);
  });
});

// ─── Withdraw panel ───────────────────────────────────────────────────────────

test.describe("Withdraw panel UI", () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, "withdraw");
  });

  test("amount input is present", async ({ page }) => {
    await expect(page.locator('[data-testid="withdraw-amount-input"]')).toBeVisible();
  });

  test("recipient input defaults to empty and shows placeholder", async ({ page }) => {
    const input = page.locator('[data-testid="withdraw-recipient-input"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue("");
  });

  test("max button appears when note has a shielded amount", async ({ page }) => {
    await seedNote(page, 0.25);
    await page.reload();
    await gotoApp(page, "withdraw");
    await expect(page.locator('[data-testid="withdraw-max-btn"]')).toBeVisible();
    await expect(page.locator('[data-testid="withdraw-max-btn"]')).toContainText("0.25");
  });

  test("max button fills the amount input", async ({ page }) => {
    await seedNote(page, 0.3);
    // Reload to let the localStorage note hydrate into React state
    await page.reload();
    await page.waitForSelector('[data-testid="app-sidebar"]', { timeout: 15_000 });
    // Max button appears once React hydrates the note from localStorage
    const maxBtn = page.locator('[data-testid="withdraw-max-btn"]');
    await expect(maxBtn).toBeVisible({ timeout: 8_000 });
    await maxBtn.click();
    await expect(page.locator('[data-testid="withdraw-amount-input"]')).toHaveValue("0.3");
  });

  test("withdraw button is disabled with no amount", async ({ page }) => {
    await expect(page.locator('[data-testid="withdraw-submit-btn"]')).toBeDisabled();
  });
});

// ─── History panel ────────────────────────────────────────────────────────────

test.describe("History panel", () => {
  test("shows empty state when no transactions", async ({ page }) => {
    await page.goto("/app");
    await clearAppStorage(page);
    await page.reload();
    await gotoApp(page, "history");
    await expect(page.locator('[data-testid="history-panel"]')).toContainText(/No transactions|empty/i);
  });

  test("shows seeded transaction history", async ({ page }) => {
    await page.goto("/app");
    const history = [
      { signature: "abc123", type: "shield", amount: 100_000_000, timestamp: Date.now() },
      { signature: "def456", type: "withdraw", amount: 50_000_000, timestamp: Date.now() - 60_000 },
    ];
    await page.evaluate((h) => localStorage.setItem("veil_tx_history", JSON.stringify(h)), history);
    // Navigate directly to history tab — fresh mount reads seeded localStorage
    await gotoApp(page, "history");
    // app-ready fires after rehydrate effect, so txHistory is already populated
    const panel = page.locator('[data-testid="history-panel"]');
    await expect(panel).not.toContainText("No transactions yet", { timeout: 5_000 });
    await expect(panel).toContainText("0.1000");
    await expect(panel).toContainText("0.0500");
  });
});

// ─── Wallet connect ───────────────────────────────────────────────────────────

test.describe("Wallet connect button", () => {
  test("connect button is visible in top bar", async ({ page }) => {
    await gotoApp(page);
    // WalletDropdown renders "Connect" when no wallet is connected
    const btn = page.locator('[data-testid="topbar"]').getByRole("button", { name: /connect/i });
    await expect(btn).toBeVisible();
  });

  test("clicking connect opens wallet dropdown", async ({ page }) => {
    await gotoApp(page);
    await page.locator('[data-testid="topbar"]').getByRole("button", { name: /connect/i }).click();
    // Our custom WalletDropdown opens a dialog with wallet list
    await expect(page.getByRole("dialog", { name: /connect a wallet/i })).toBeVisible({ timeout: 5_000 });
  });
});

// ─── Wallet-connected flows (requires Phantom) ───────────────────────────────
// These tests are gated behind the PHANTOM_AVAILABLE env var.
// Run with: npm run test:wallet
// You will be prompted to approve transactions in Phantom during these tests.
//
// All three tests share a single browser context (serial mode) so that
// localStorage — balance, note, tx history — carries over between them.

const skipWithoutPhantom = !process.env.PHANTOM_AVAILABLE;

test.describe("Wallet flows (requires Phantom)", () => {
  test.describe.configure({ mode: "serial" });
  test.skip(skipWithoutPhantom, "Set PHANTOM_AVAILABLE=1 to run wallet tests");

  // Shared page lives for the full describe block so localStorage persists.
  let wp: Page;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    wp = await ctx.newPage();
    await wp.goto("http://localhost:3000/app");
    await clearAppStorage(wp);

    // Connect Phantom once — user must approve the connection popup.
    await connectPhantomWallet(wp);
    await gotoApp(wp, "shield");
  });

  test.afterAll(async () => {
    await wp.context().close();
  });

  test("balance updates optimistically after successful shield", async () => {
    // Select 0.1 SOL preset
    await wp.locator('[data-testid="preset-0.1"]').click();
    await expect(wp.locator('[data-testid="shield-amount-input"]')).toHaveValue("0.1");

    // Click shield — Phantom will show two popups: sign-message then sign-tx.
    await wp.locator('[data-testid="shield-submit-btn"]').click({ timeout: 15_000 });

    // After the shield completes, the balance card should show the deposited amount
    // without showing a skeleton. Allow generous timeout for ZK proof generation.
    await expect(wp.locator('[data-testid="balance-value"]')).toContainText("0.1000", {
      timeout: 300_000, // ZK proof + tx confirmation can take ~3 minutes
    });
    await expect(wp.locator('[data-testid="balance-skeleton"]')).not.toBeVisible();

    // Success toast should have appeared.
    await expect(wp.locator('[data-testid="toast"]')).toContainText(/shielded successfully/i, {
      timeout: 5_000,
    });
  });

  test("balance persists across page reload after shield", async () => {
    // veil_balance was written by the previous test in the same browser context.
    const stored = await wp.evaluate(() => localStorage.getItem("veil_balance"));
    expect(stored).not.toBeNull();

    await wp.reload();
    await wp.waitForSelector('[data-testid="balance-card"]');
    // Balance shows immediately from cache — no skeleton.
    await expect(wp.locator('[data-testid="balance-skeleton"]')).not.toBeVisible();
    await expect(wp.locator('[data-testid="balance-value"]')).not.toContainText("–.––––");
  });

  test("balance decreases after successful withdrawal", async () => {
    await gotoApp(wp, "withdraw");

    const balanceBefore = await wp.evaluate(() =>
      Number(localStorage.getItem("veil_balance") ?? 0)
    );
    expect(balanceBefore).toBeGreaterThan(0);

    // Enter a small withdrawal amount.
    await wp.locator('[data-testid="withdraw-amount-input"]').fill("0.05");

    // Click withdraw — Phantom: sign-message then sign-tx.
    await wp.locator('[data-testid="withdraw-submit-btn"]').click();

    // Wait for success.
    await expect(wp.locator('[data-testid="toast"]')).toContainText(/withdrawal successful/i, {
      timeout: 300_000,
    });

    // Balance should have dropped.
    const balanceAfter = await wp.evaluate(() =>
      Number(localStorage.getItem("veil_balance") ?? 0)
    );
    expect(balanceAfter).toBeLessThan(balanceBefore);
  });
});
