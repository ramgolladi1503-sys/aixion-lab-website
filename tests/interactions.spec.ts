import { test, expect } from "@playwright/test";

test("Home gallery destination cards navigate to the real routes", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const systems = page.locator('.screen-card[href="/systems"]');
  await expect(systems).toBeVisible();
  await systems.click();
  await expect(page).toHaveURL(/\/systems$/);
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

test("System page exposes internal navigation", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator('.system-subnav a[href="#architecture"]')).toBeVisible();
  await expect(page.locator('.system-subnav a[href="#evidence"]')).toBeVisible();
});

test("compact inner-page menu exposes core routes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about", { waitUntil: "networkidle" });
  const menu = page.locator("details.mobile-menu");
  await expect(menu.locator("summary")).toBeVisible();
  await menu.locator("summary").click();
  await expect(menu.getByRole("link", { name: "Systems" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Research" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Pulse" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Journey" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "About" })).toBeVisible();
});
