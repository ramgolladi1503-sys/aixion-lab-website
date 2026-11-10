import { test, expect } from "@playwright/test";

test("homepage keeps system claims within their documented maturity", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".row_meta_val", { hasText: "BUILDING" })).toBeVisible();
  await expect(page.locator(".row_meta_val", { hasText: "REJECTED" })).toBeVisible();
  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).toContain("read_only");
  expect(body).toContain("does not provide investment advice");
});

test("mobile homepage keeps the approved four destinations and no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#shuffler_stage .card_item").first()).toBeAttached();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("work spreads prioritize two flagship systems and separate supporting work", async ({ page }) => {
  await page.goto("/work", { waitUntil: "networkidle" });
  await expect(page.locator(".work-story")).toHaveCount(2);
  await expect(page.locator(".work-support__item")).toHaveCount(2);
  await expect(page.locator(".work-story__copy").first()).toContainText("TradeBot");
  await expect(page.locator(".work-story__copy").nth(1)).toContainText("Aixion Control Core");
  await expect(page.getByRole("heading", { name: "Useful work continues beyond the flagship system" })).toBeVisible();
});
