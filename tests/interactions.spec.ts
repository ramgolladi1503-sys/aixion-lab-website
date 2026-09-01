import { test, expect } from "@playwright/test";

test("Lab Career mode changes presentation state", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: "Toggle Lab and Career view" });
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-view", "career");
  await expect(toggle).toContainText("Career");
  if (testInfo.project.name === "mobile") {
    await expect(page.locator("details.mobile-menu summary")).toBeVisible();
  } else {
    await expect(page.locator(".career-only").first()).toBeVisible();
  }
});

test("Research status filters are functional", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Rejected" }).click();
  await expect(page.getByText("Mean reversion candidate")).toBeVisible();
  await expect(page.getByText("Opening-session market structure")).toBeHidden();
});

test("Evidence Drawer is proof-first, explicit about summary-only records and closes", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: /Inspect evidence/i }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Evidence record/i });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(/public-safe evidence summary|public\/private boundary/i);
  await page.getByRole("button", { name: "Close evidence" }).click();
  await expect(dialog).toBeHidden();
});

test("Command palette supports keyboard navigation on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Command palette is a desktop keyboard surface");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press("Meta+k");
  const dialog = page.getByRole("dialog", { name: "Search Aixion" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("Primary navigation exposes active route", async ({ page }) => {
  await page.goto("/systems", { waitUntil: "networkidle" });
  await expect(page.locator('.desktop-nav a[href="/systems"]')).toHaveAttribute("aria-current", "page");
});

test("System page exposes internal navigation", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator('.system-subnav a[href="#architecture"]')).toBeVisible();
  await expect(page.locator('.system-subnav a[href="#evidence"]')).toBeVisible();
});

test("Mobile navigation exposes locked routes with usable targets", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const menu = page.locator("details.mobile-menu");
  await menu.locator("summary").click();
  await expect(menu.getByRole("link", { name: "Systems" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Research" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Pulse" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Journey" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "About" })).toBeVisible();
});
