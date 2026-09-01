import { test, expect } from "@playwright/test";

test("home has a memorable light editorial thesis and flagship orientation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Applied intelligence, automation and decision systems." })).toBeVisible();
  await expect(page.getByText(/Built by Ram — Quality Engineering/)).toBeVisible();
  await expect(page.locator(".home-flagships .flagship-record")).toHaveCount(2);
  await expect(page.locator(".home-flagships").getByText("TradeBot", { exact: true })).toBeVisible();
  await expect(page.locator(".home-flagships").getByText("Aixion Control Core", { exact: true })).toBeVisible();
  await expect(page.locator(".editorial-home")).toBeVisible();
  await expect(page.locator(".observable-home")).toHaveCount(0);
});

test("motion reveals editorial sections without becoming the content model", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#motion-scope")).toHaveClass(/motion-ready/);
  await expect(page.locator('[data-reveal="hero"]')).toHaveClass(/is-revealed/);
  await expect(page.locator('[data-reveal="proof"]')).toBeVisible();
  await expect(page.locator("[data-aixion-signal]")).toBeVisible();
});

test("reduced-motion preserves the complete editorial Home", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#motion-scope")).toHaveClass(/motion-reduced/);
  await expect(page.locator('[data-reveal="hero"]')).toHaveClass(/is-revealed/);
  await expect(page.getByRole("link", { name: /Explore systems/i })).toBeVisible();
  await expect(page.locator("[data-aixion-signal]")).toBeVisible();
});

test("Journey is an escalating engineering-question narrative", async ({ page }) => {
  await page.goto("/journey", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "The tools changed. The questions got stricter." })).toBeVisible();
  await expect(page.getByText(/Why did this fail/)).toBeVisible();
  await expect(page.getByText(/What state is the system actually in/)).toBeVisible();
  await expect(page.getByText(/Can intelligence operate while remaining observable, governed and accountable/)).toBeVisible();
  await expect(page.locator(".journey-question")).toHaveCount(7);
});

test("command palette carries state, not just destinations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "The command palette is intentionally a desktop keyboard surface; mobile uses the menu.");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open Aixion search" }).click();
  await expect(page.getByRole("dialog", { name: "Search Aixion" })).toBeVisible();
  await expect(page.locator('.command-results a[href="/systems/tradebot"] .command-meta')).toContainText("VALIDATING");
  await expect(page.locator('.command-results a[href="/systems/analytics"] .command-meta')).toContainText("BUILDING");
  await expect(page.locator('.command-results a[href="/journey"] .command-meta')).toContainText("7 QUESTIONS");
});

test("system subnavigation reflects deliberate section navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Sticky section authority is a desktop interaction");
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const architectureLink = page.locator('.system-subnav a[href="#architecture"]');
  await architectureLink.click();
  await expect(architectureLink).toHaveClass(/is-active/);
  await expect(architectureLink).toHaveAttribute("aria-current", "location");
});
