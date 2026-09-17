import { test, expect, type Locator } from "@playwright/test";
import path from "node:path";

const routes = [
  ["entry", "/"], ["home", "/home"], ["systems", "/systems"], ["tradebot", "/systems/tradebot"],
  ["control-tower", "/systems/control-tower"], ["automation", "/systems/automation"], ["analytics", "/systems/analytics"],
  ["research", "/research"], ["about", "/about"], ["collaborate", "/collaborate"], ["resume", "/resume"],
] as const;

for (const [name, route] of routes) {
  test(`${name} renders without horizontal overflow`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)).toBe(false);
    await page.screenshot({ path: path.join("test-results", "screenshots", testInfo.project.name, `${name}.png`), fullPage: true });
  });
}

const fontPx = async (locator: Locator) => locator.evaluate(el => Number.parseFloat(getComputedStyle(el).fontSize));

test("entry remains isolated from scroll navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const before = page.url();
  await page.mouse.wheel(0, 1600);
  await page.waitForTimeout(120);
  expect(page.url()).toBe(before);
});

test("rebuilt target pages use approved composition", async ({ page }) => {
  for (const [route, selector] of [["/systems", ".mock-systems-page"], ["/research", ".mock-research-page"], ["/collaborate", ".mock-collaborate-page"], ["/resume", ".mock-profile-page"]] as const) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(selector)).toBeVisible();
  }
});

test("system pages use compact product showcase", async ({ page }) => {
  for (const route of ["/systems/tradebot", "/systems/control-tower", "/systems/analytics", "/systems/automation"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(".system-showcase")).toBeVisible();
    await expect(page.locator(".showcase-capability-strip article")).toHaveCount(4);
    await expect(page.locator(".showcase-subnav button")).toHaveCount(5);
  }
});

test("body typography remains readable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop readability gate");
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  expect(await fontPx(page.locator(".showcase-context > p"))).toBeGreaterThanOrEqual(16);
  await page.goto("/collaborate", { waitUntil: "networkidle" });
  expect(await fontPx(page.locator(".mock-collaborate-hero > p"))).toBeGreaterThanOrEqual(16);
  await page.goto("/research", { waitUntil: "networkidle" });
  expect(await fontPx(page.locator(".mock-research-intro p:not(.mock-kicker)").first())).toBeGreaterThanOrEqual(15.5);
});

test("research is dense and reveals only one detail", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await expect(page.locator(".mock-research-card")).toHaveCount(11);
  await page.locator(".mock-research-card").first().click();
  await expect(page.locator(".mock-research-detail")).toHaveCount(1);
  await page.locator(".mock-research-card").nth(4).click();
  await expect(page.locator(".mock-research-detail")).toHaveCount(1);
  await expect(page.locator(".mock-research-card.selected")).toHaveCount(1);
});

test("decorative serial numbers are absent from rebuilt pages and drawer", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await expect(page.locator(".research-topic-number")).toHaveCount(0);
  await page.goto("/collaborate", { waitUntil: "networkidle" });
  await expect(page.getByText(/^0[1-9]$/)).toHaveCount(0);
  await page.getByRole("button", { name: /Toggle navigation drawer/i }).click();
  await expect(page.locator(".unseen-drawer-nav").getByText(/^0[1-9]$/)).toHaveCount(0);
});

test("theme can switch and persist", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: /Switch to .* mode/i });
  await toggle.click();
  const theme = await page.locator("html").getAttribute("data-theme");
  expect(["light", "dark"]).toContain(theme);
  expect(await page.evaluate(() => localStorage.getItem("aixion-theme"))).toBe(theme);
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
});

test("status controls stay off editorial pages", async ({ page }) => {
  for (const route of ["/research", "/about", "/collaborate", "/resume", "/systems/control-tower", "/systems/analytics", "/systems/automation"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(".unseen-status-bar")).toHaveCount(0);
  }
});
