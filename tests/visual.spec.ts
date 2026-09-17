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
  await expect(page.locator(".mock-research-card")).toHaveCount(4);
  await expect(page.locator(".research-topic-trigger")).toHaveCount(11);
  await page.locator(".mock-research-card").first().click();
  await expect(page.locator(".mock-research-detail")).toHaveCount(1);
  await page.locator(".mock-research-archive").evaluate((element: HTMLDetailsElement) => { element.open = true; });
  await page.locator(".mock-research-archive-grid button").first().click();
  await expect(page.locator(".mock-research-detail")).toHaveCount(1);
  await expect(page.locator(".research-topic-trigger.selected")).toHaveCount(1);
});

test("research content remains visible throughout scrolling", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  const cards = page.locator(".mock-research-card");
  await expect(cards).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    const card = cards.nth(index);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect(card).toHaveCSS("opacity", "1");
    await expect(card.locator("strong")).toHaveCSS("opacity", "1");
    await expect(card.locator(".mock-research-thumb")).not.toHaveCSS("clip-path", /inset\([^)]*100%/);
  }
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

test("interior pages use a veil-free readable canvas", async ({ page }) => {
  for (const [route, root] of [["/systems", ".mock-systems-page"], ["/research", ".mock-research-page"], ["/about", ".about-editorial-page"], ["/collaborate", ".mock-collaborate-page"], ["/resume", ".mock-profile-page"]] as const) {
    await page.goto(route, { waitUntil: "networkidle" });
    const styles = await page.locator(root).evaluate(element => {
      const computed = getComputedStyle(element);
      const after = getComputedStyle(element, "::after");
      return {
        backdropFilter: computed.backdropFilter,
        afterDisplay: after.display,
        afterContent: after.content,
      };
    });
    expect(styles.backdropFilter).toBe("none");
    expect(styles.afterDisplay === "none" || styles.afterContent === "none").toBe(true);
  }
});

test("mobile context rails wrap without hidden labels", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile wrapping gate");
  for (const route of ["/systems", "/research", "/about", "/collaborate"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const rail = page.locator(".premium-context-rail");
    const labels = rail.locator("span");
    await expect(rail).toBeVisible();
    expect(await labels.count()).toBeGreaterThanOrEqual(4);
    const boxes = await labels.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().toJSON()));
    expect(new Set(boxes.map(box => Math.round(box.y))).size).toBeGreaterThan(1);
    const viewportWidth = page.viewportSize()?.width ?? 0;
    expect(boxes.every(box => box.width > 0 && box.right <= viewportWidth + 1)).toBe(true);
  }
});

test("motion never makes page content a visibility dependency", async ({ page }) => {
  for (const route of ["/systems", "/research", "/about", "/collaborate", "/resume", "/systems/tradebot"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(100);
    const hidden = await page.locator("[data-global-motion], [data-motion]").evaluateAll(elements => elements.filter(element => {
      const style = getComputedStyle(element);
      return style.opacity === "0" || style.visibility === "hidden" || style.display === "none" || /100%/.test(style.clipPath);
    }).length);
    expect(hidden, `${route} retains hidden motion content`).toBe(0);
  }
});

test("reduced motion disables transitions and animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/research", "/about", "/systems/tradebot"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const moving = await page.locator("[data-global-motion], [data-motion]").evaluateAll(elements => elements.filter(element => {
      const style = getComputedStyle(element);
      return style.transitionDuration !== "0s" || style.animationDuration !== "0s" || style.transform !== "none";
    }).length);
    expect(moving, `${route} ignores reduced-motion`).toBe(0);
  }
});
