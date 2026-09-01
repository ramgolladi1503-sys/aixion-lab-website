import { test, expect } from "@playwright/test";

test("editorial Home keeps state, evidence and authority public-safe", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".editorial-home")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Claims stay bounded by evidence." })).toBeVisible();
  await expect(page.getByText("Rejected work remains visible.")).toBeVisible();
  await expect(page.getByText("Public evidence is deliberately scoped.")).toBeVisible();
  await expect(page.getByText("Automation does not erase human authority.")).toBeVisible();
  await expect(page.locator(".home-systems-list .home-system-row")).toHaveCount(4);

  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).not.toContain("win rate");
  expect(body).not.toContain("accuracy %");
  expect(body).not.toContain("roi");
  expect(body).not.toContain("execution allowed");
  expect(body).not.toContain("evidence strength");
  expect(body).not.toContain("tests passed");
});

test("editorial Home is intentionally recomposed for mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Applied intelligence, automation and decision systems." })).toBeVisible();
  await expect(page.getByText(/Built by Ram/)).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore systems/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Current Pulse/i }).first()).toBeVisible();
  await expect(page.locator("details.mobile-menu summary")).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("Aixion lifecycle remains legible in reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#motion-scope")).toHaveClass(/motion-reduced/);
  await expect(page.locator("[data-aixion-signal]")).toBeVisible();
  await expect(page.getByText("RESEARCH", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("LEARN", { exact: true }).first()).toBeVisible();
});

test("editorial convergence does not replace validated interactions", async ({ page }, testInfo) => {
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
