import { test, expect } from "@playwright/test";

test("cinematic Home stays public-safe and evidence-led", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".destination-panel")).toHaveCount(5);
  await expect(page.getByText(/STATE · EVIDENCE · AUTHORITY/).first()).toBeVisible();

  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).not.toContain("win rate");
  expect(body).not.toContain("accuracy %");
  expect(body).not.toContain("roi");
  expect(body).not.toContain("execution allowed");
  expect(body).not.toContain("evidence strength");
  expect(body).not.toContain("tests passed");
  expect(body).not.toMatch(/chapter\s*0?\d/);
});

test("cinematic Home is deliberately recomposed for mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".destination-grid")).toBeVisible();
  await expect(page.locator(".destination-panel")).toHaveCount(5);
  await expect(page.locator("details.mobile-menu summary")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("cinematic landing respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#motion-scope")).toHaveClass(/motion-reduced/);
  const transition = await page.locator(".destination-panel").first().evaluate(node => getComputedStyle(node).transitionDuration);
  expect(transition === "0s" || transition.split(",").every(value => value.trim() === "0s")).toBe(true);
});

test("visual convergence does not replace validated interactions", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile") {
    await expect(page.locator("details.mobile-menu summary")).toBeVisible();
  } else {
    await expect(page.getByRole("button", { name: "Open Aixion search" })).toHaveText("Search");
  }

  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-core")).toBeVisible();

  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: /Inspect evidence/i }).first()).toBeVisible();
});
