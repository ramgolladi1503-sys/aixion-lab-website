import { test, expect } from "@playwright/test";

test("homepage keeps system claims within their documented maturity", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("VALIDATING", { exact: true })).toBeVisible();
  await expect(page.getByText("BUILDING", { exact: true })).toBeVisible();
  await expect(page.getByText("REJECTED", { exact: true })).toBeVisible();
  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).not.toContain("win rate");
  expect(body).not.toContain("accuracy %");
  expect(body).not.toContain("roi");
  expect(body).not.toContain("execution allowed");
  expect(body).not.toContain("tests passed");
});

test("mobile redesign has four usable project tabs, a compact menu and no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("tablist", { name: "Explore Aixion Lab" }).getByRole("tab")).toHaveCount(4);
  await expect(page.locator("details.mobile-menu summary")).toBeVisible();
  const menu = page.locator("details.mobile-menu");
  await menu.locator("summary").click();
  const navigation = menu.getByRole("navigation", { name: "Mobile navigation" });
  const primaryDestinations = await navigation.getByRole("link").evaluateAll((links) => links.slice(0, 5).map((link) => link.textContent?.trim()));
  expect(primaryDestinations).toEqual(["Home", "The Lab", "Work", "Research", "Approach"]);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("work spreads prioritize two flagship systems and separate supporting work", async ({ page }) => {
  await page.goto("/work", { waitUntil: "networkidle" });
  await expect(page.locator(".work-story")).toHaveCount(2);
  await expect(page.locator(".work-support__item")).toHaveCount(2);
  await expect(page.locator(".work-story__copy").first()).toContainText("TradeBot");
  await expect(page.locator(".work-story__copy").nth(1)).toContainText("Aixion Control Core");
  await expect(page.getByRole("heading", { name: "Useful work continues beyond the flagship systems." })).toBeVisible();
});
