import { test, expect } from "@playwright/test";

test("observable homepage is state-bound and public-safe", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });

  const field = page.locator(".observable-field");
  await expect(field).toBeVisible();
  await expect(field.locator("svg")).toHaveAttribute("aria-labelledby", /observable-title observable-desc/);
  await expect(field.getByText("VALIDATING", { exact: true }).first()).toBeVisible();
  await expect(field.getByText("BUILDING", { exact: true }).first()).toBeVisible();
  await expect(field.getByText("REJECTED", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Systems should be able to explain their state, their evidence and their limits/i })).toBeVisible();

  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).not.toContain("win rate");
  expect(body).not.toContain("accuracy %");
  expect(body).not.toContain("roi");
  expect(body).not.toContain("execution allowed");
});

test("observable homepage keeps content usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".observable-field")).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore systems/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /View Lab Pulse/ }).first()).toBeVisible();
  await expect(page.locator("details.mobile-menu summary")).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("observable field respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });

  const animation = await page.locator(".state-band-line").first().evaluate(node => {
    const style = getComputedStyle(node);
    return { name: style.animationName, duration: style.animationDuration, count: style.animationIterationCount };
  });

  expect(animation.name).toBe("none");
  expect(animation.duration === "0s" || animation.duration === "0ms").toBe(true);
  expect(animation.count === "1" || animation.count === "1.0").toBe(true);
});

test("observable redesign does not replace validated interactions", async ({ page }, testInfo) => {
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
