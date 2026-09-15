import { test, expect, type Locator } from "@playwright/test";
import path from "node:path";

const routes = [
  ["entry", "/"], ["home", "/home"], ["systems", "/systems"],
  ["tradebot", "/systems/tradebot"], ["control-tower", "/systems/control-tower"],
  ["automation", "/systems/automation"], ["analytics", "/systems/analytics"],
  ["research", "/research"], ["about", "/about"], ["collaborate", "/collaborate"], ["resume", "/resume"],
] as const;

for (const [name, route] of routes) {
  test(`${name} renders without horizontal overflow`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(hasHorizontalOverflow, `${route} must not overflow horizontally`).toBe(false);
    const destination = path.join("test-results", "screenshots", testInfo.project.name, `${name}.png`);
    await page.screenshot({ path: destination, fullPage: true });
  });
}

const fontPx = async (locator: Locator) => locator.evaluate((el) => Number.parseFloat(getComputedStyle(el).fontSize));

test("entry is an isolated non-scrolling gate", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const before = page.url();
  await page.mouse.wheel(0, 1400);
  await page.waitForTimeout(150);
  expect(page.url()).toBe(before);
  const metrics = await page.evaluate(() => ({ h: document.documentElement.scrollHeight, v: window.innerHeight, y: window.scrollY }));
  expect(metrics.y).toBe(0);
  expect(metrics.h).toBeLessThanOrEqual(metrics.v + 2);
});

test("home only reaches systems by explicit navigation", async ({ page }) => {
  await page.goto("/home", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.mouse.wheel(0, 1400);
  await page.waitForTimeout(100);
  expect(new URL(page.url()).pathname).toBe("/home");
  await expect(page.getByRole("link", { name: /Explore our work/i })).toHaveAttribute("href", "/systems");
});

test("editorial body typography is comfortable on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop readability gate");
  await page.goto("/about", { waitUntil: "networkidle" });
  expect(await fontPx(page.locator(".about-lede p").first())).toBeGreaterThanOrEqual(18.5);
  expect(await fontPx(page.locator(".about-two-up article > p").first())).toBeGreaterThanOrEqual(17);
  expect(await fontPx(page.locator(".about-principle-grid p").first())).toBeGreaterThanOrEqual(16);
  await page.goto("/research", { waitUntil: "networkidle" });
  expect(await fontPx(page.locator(".research-intro-copy p").first())).toBeGreaterThanOrEqual(18.5);
  expect(await fontPx(page.locator(".research-topic-summary").first())).toBeGreaterThanOrEqual(15.5);
  await page.goto("/collaborate", { waitUntil: "networkidle" });
  expect(await fontPx(page.locator(".collaborate-hero-grid > p"))).toBeGreaterThanOrEqual(18.5);
  expect(await fontPx(page.locator(".collaborate-fit-grid li").first())).toBeGreaterThanOrEqual(16);
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  expect(await fontPx(page.locator(".system-hero-summary"))).toBeGreaterThanOrEqual(18);
  expect(await fontPx(page.locator(".system-capability-desc").first())).toBeGreaterThanOrEqual(16);
});

test("display hierarchy does not crush body copy", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop hierarchy gate");
  for (const [route, heading, body] of [
    ["/about", ".about-hero-grid h1", ".about-lede p"],
    ["/research", ".research-intro-grid h1", ".research-intro-copy p"],
    ["/collaborate", ".collaborate-hero h1", ".collaborate-hero-grid > p"],
  ] as const) {
    await page.goto(route, { waitUntil: "networkidle" });
    const h = await fontPx(page.locator(heading).first());
    const b = await fontPx(page.locator(body).first());
    expect(h).toBeLessThanOrEqual(88.5);
    expect(b).toBeGreaterThanOrEqual(18.5);
  }
});

test("About and Collaborate do not reserve a blank trailing viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop tail-space gate");
  for (const [route, lastSelector] of [["/about", ".about-closing"], ["/collaborate", ".collaborate-cta"]] as const) {
    await page.goto(route, { waitUntil: "networkidle" });
    const gap = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (!el) return 9999;
      const bottom = el.getBoundingClientRect().bottom + window.scrollY;
      return document.documentElement.scrollHeight - bottom;
    }, lastSelector);
    expect(gap).toBeLessThan(100);
  }
});

test("research has hierarchy and reveals only one focus", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await expect(page.locator(".research-topic-card.primary-theme")).toHaveCount(5);
  await expect(page.locator(".research-topic-card.supporting-theme")).toHaveCount(6);
  await page.locator(".research-topic-card").nth(0).click();
  await expect(page.locator(".research-reveal")).toHaveCount(1);
  await page.locator(".research-topic-card").nth(2).click();
  await expect(page.locator(".research-reveal")).toHaveCount(1);
  await expect(page.locator(".research-topic-card.selected")).toHaveCount(1);
});

test("systems removes duplicate introduction and preserves flagship hierarchy", async ({ page }) => {
  await page.goto("/systems", { waitUntil: "networkidle" });
  await expect(page.getByText("The work carrying the lab forward.", { exact: true })).toHaveCount(0);
  await expect(page.locator(".flagship-feature-row")).toHaveCount(2);
  await expect(page.locator(".experimental-card")).toHaveCount(2);
});

test("every system uses premium project-specific hero art", async ({ page }) => {
  const systems = [["/systems/tradebot", "premium-tradebot-hero.svg"], ["/systems/control-tower", "premium-control-hero.svg"], ["/systems/analytics", "premium-analytics-hero.svg"], ["/systems/automation", "premium-automation-hero.svg"]] as const;
  for (const [route, asset] of systems) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(".system-hero-media")).toHaveAttribute("src", new RegExp(asset.replace(".", "\\.")));
  }
});

test("system architecture is readable and interactive", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const first = page.locator(".system-how-step").first();
  await first.focus();
  await expect(first).toHaveClass(/active/);
  expect(await fontPx(page.locator(".system-how-step-desc").first())).toBeGreaterThanOrEqual(16);
});

test("desktop navigation drawer preserves page context", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop drawer gate");
  await page.goto("/about", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Toggle navigation drawer/i }).click();
  const drawer = page.locator(".unseen-drawer-menu");
  await expect(drawer).toBeVisible();
  const box = await drawer.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(box!.width).toBeLessThanOrEqual(480);
  expect(box!.width / viewport!.width).toBeLessThanOrEqual(0.4);
});

test("status controls stay off editorial pages", async ({ page }) => {
  for (const route of ["/research", "/about", "/collaborate", "/resume", "/systems/control-tower", "/systems/analytics", "/systems/automation"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(".unseen-status-bar")).toHaveCount(0);
  }
});

test("professional profile uses the editorial system and canonical flagship naming", async ({ page }) => {
  await page.goto("/resume", { waitUntil: "networkidle" });
  await expect(page.locator(".profile-editorial-page")).toBeVisible();
  await expect(page.getByText("Aixion Control Tower", { exact: true })).toBeVisible();
  await expect(page.getByText("Aixion Control Core", { exact: true })).toHaveCount(0);
});
