import { test, expect } from "@playwright/test";

test("homepage explains the business offer and keeps its scope explicit", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const hero = page.getByRole("tabpanel");
  await expect(hero).toContainText("Your business has a problem. We engineer the solution.");
  await expect(hero.getByRole("link", { name: "Discuss a workflow" })).toHaveAttribute("href", "/about#contact");

  const offer = page.locator("#home-intro");
  await expect(offer.getByRole("heading", { name: "Make everyday operations easier to run." })).toBeVisible();
  await expect(offer.locator(".home-work__image img")).toBeVisible();
  await expect(offer.getByText(/customer requests/i)).toBeVisible();
  await expect(offer.getByText(/orders & handoffs/i)).toBeVisible();
  await expect(offer.getByText(/repeated admin/i)).toBeVisible();
  await expect(offer.getByText(/starting points, not packaged products/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "When the inputs move, the evidence has to keep up." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Useful automation needs a clear boundary around action." })).toBeVisible();
});

test("business hero and examples fit a mobile viewport without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("tabpanel").getByRole("link", { name: "Discuss a workflow" })).toBeVisible();
  await expect(page.locator("#home-intro")).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test("business section keeps the story image, examples and note closely grouped", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop section spacing assertion");
  await page.goto("/", { waitUntil: "networkidle" });

  const spacing = await page.locator("#home-intro").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      rowGap: parseFloat(style.rowGap),
      paddingTop: parseFloat(style.paddingTop),
      paddingBottom: parseFloat(style.paddingBottom),
    };
  });
  expect(spacing.rowGap).toBeLessThanOrEqual(40);
  expect(spacing.paddingTop).toBeLessThanOrEqual(84);
  expect(spacing.paddingBottom).toBeLessThanOrEqual(84);
});
