import { test, expect } from "@playwright/test";

test("approved gallery Home remains public-safe and evidence bounded", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".approved-gallery-home")).toBeVisible();
  await expect(page.locator(".screen-card")).toHaveCount(14);
  await expect(page.getByRole("link", { name: /TradeBot/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Research/i }).first()).toBeVisible();

  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).not.toContain("win rate");
  expect(body).not.toContain("accuracy %");
  expect(body).not.toContain("guaranteed return");
  expect(body).not.toContain("execution allowed");
  expect(body).not.toContain("live profitable");
});

test("approved gallery Home recomposes cleanly for mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".gallery-masthead")).toBeVisible();
  await expect(page.locator(".screen-card")).toHaveCount(14);
  await expect(page.locator(".screen-card").first()).toBeVisible();

  const first = await page.locator(".screen-slot").nth(0).boundingBox();
  const second = await page.locator(".screen-slot").nth(1).boundingBox();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect((second?.y ?? 0) > (first?.y ?? 0)).toBe(true);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("approved gallery respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".screen-card")).toHaveCount(14);
  const transitions = await page.locator(".screen-card").first().evaluate(node => getComputedStyle(node).transitionDuration);
  expect(transitions.includes("0s") || transitions.includes("0ms")).toBe(true);
});

test("cinematic redesign preserves meaningful inner-page interactions", async ({ page }) => {
  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-core")).toBeVisible();

  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: /Inspect evidence/i }).first()).toBeVisible();

  await page.goto("/research", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Research Notes" })).toBeVisible();
});
