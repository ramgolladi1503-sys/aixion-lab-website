import { test, expect } from "@playwright/test";

test("approved observable Home keeps state, evidence and authority public-safe", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".observable-home")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Systems should be able to explain their state, their evidence and their limits." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The rest of the lab lives on dedicated pages." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Questions, frozen hypotheses and rejected work/i })).toBeVisible();
  await expect(page.locator(".system-grid .system-card")).toHaveCount(4);

  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).not.toContain("win rate");
  expect(body).not.toContain("accuracy %");
  expect(body).not.toContain("roi");
  expect(body).not.toContain("execution allowed");
  expect(body).not.toContain("evidence strength");
  expect(body).not.toContain("tests passed");
});

test("approved observable Home is deliberately recomposed for mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Systems should be able to explain their state, their evidence and their limits." })).toBeVisible();
  await expect(page.getByText("Built by Ram", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore systems/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /View Lab Pulse/i }).first()).toBeVisible();
  await expect(page.locator("details.mobile-menu summary")).toBeVisible();
  await expect(page.locator(".observable-field")).toBeVisible();
  await expect(page.locator("[data-aixion-signal]").first()).toBeHidden();
  await expect(page.getByRole("heading", { name: "The rest of the lab lives on dedicated pages." })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("Aixion lifecycle respects reduced motion and deliberate mobile subtraction", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#motion-scope")).toHaveClass(/motion-reduced/);
  const lifecycle = page.locator("[data-aixion-signal]").first();
  if (testInfo.project.name === "mobile") {
    await expect(lifecycle).toBeHidden();
  } else {
    await expect(lifecycle).toBeVisible();
    await expect(page.getByText("RESEARCH", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("LEARN", { exact: true }).first()).toBeVisible();
  }
});

test("dark convergence does not replace validated interactions", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile") {
    await expect(page.locator("details.mobile-menu summary")).toBeVisible();
  } else {
    await expect(page.getByRole("button", { name: "Open Aixion search" })).toHaveText("Search");
  }
  await expect(page.locator("footer.site-footer .footer-manifesto-line")).toHaveCount(2);

  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-core")).toBeVisible();

  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: /Inspect evidence/i }).first()).toBeVisible();
});
