import { test, expect } from "@playwright/test";

test("robot-mind Home keeps state, evidence and authority public-safe", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".sharp-home")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Intelligence with evidence/i })).toBeVisible();
  await expect(page.locator(".robot-mind")).toBeVisible();
  await expect(page.locator(".sharp-system-row")).toHaveCount(4);
  await expect(page.getByText("STATE", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("EVIDENCE", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("AUTHORITY", { exact: true }).first()).toBeVisible();

  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).not.toContain("win rate");
  expect(body).not.toContain("accuracy %");
  expect(body).not.toContain("roi");
  expect(body).not.toContain("execution allowed");
  expect(body).not.toContain("evidence strength");
  expect(body).not.toContain("tests passed");
});

test("robot-mind Home is deliberately recomposed for mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: /Intelligence with evidence/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore systems/i }).first()).toBeVisible();
  await expect(page.locator("details.mobile-menu summary")).toBeVisible();
  await expect(page.locator(".robot-mind")).toBeVisible();
  await expect(page.locator(".sharp-state-cell")).toHaveCount(4);
  await expect(page.locator(".sharp-system-row")).toHaveCount(4);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("robot-mind animations respect reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#motion-scope")).toHaveClass(/motion-reduced/);
  await expect(page.locator(".robot-mind")).toBeVisible();
  const selectors = [".robot-mind-svg", ".robot-mind-aura", ".robot-mind-orbit--outer", ".sharp-marquee-track"];
  for (const selector of selectors) {
    const animation = await page.locator(selector).first().evaluate(node => getComputedStyle(node).animationName);
    expect(animation, `${selector} should stop animating`).toBe("none");
  }
});

test("cinematic redesign does not replace validated interactions", async ({ page }, testInfo) => {
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
