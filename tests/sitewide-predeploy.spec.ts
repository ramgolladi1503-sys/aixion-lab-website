import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/systems",
  "/systems/tradebot",
  "/systems/control-core",
  "/systems/automation",
  "/systems/analytics",
  "/research",
  "/research/opening-session-market-structure",
  "/research/rec-md-structural-interaction",
  "/research/mean-reversion-candidate",
  "/research/evidence-bound-autonomy",
  "/pulse",
  "/journey",
  "/about",
  "/resume",
  "/collaborate",
] as const;

function luminance(rgb: string) {
  const values = rgb.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
  return values.reduce((sum, value) => sum + value, 0) / 3;
}

test("every public route loads, has content, and has no horizontal overflow", async ({ page }) => {
  const browserErrors: string[] = [];
  page.on("pageerror", error => browserErrors.push(`pageerror: ${error.message}`));
  page.on("console", message => { if (message.type() === "error") browserErrors.push(`console: ${message.text()}`); });

  for (const route of routes) {
    browserErrors.length = 0;
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status(), `${route} should load`).toBeLessThan(400);
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.locator("h1").first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${route} should not overflow horizontally`).toBeLessThanOrEqual(2);
    expect(browserErrors, `${route} should not emit browser errors`).toEqual([]);
  }
});

test("all major routes stay inside the approved dark visual authority", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    const bodyBg = await page.locator("body").evaluate(node => getComputedStyle(node).backgroundColor);
    expect(luminance(bodyBg), `${route} body must remain dark`).toBeLessThan(80);

    const paleSurfaces = await page.locator(".panel, .system-card, .research-row, .journey-card, .resume-card, .about-identity, .system-visual").evaluateAll(nodes =>
      nodes.filter(node => {
        const style = getComputedStyle(node);
        const rgb = style.backgroundColor.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
        const average = rgb.reduce((sum, value) => sum + value, 0) / 3;
        return average > 150;
      }).length
    );
    expect(paleSurfaces, `${route} should not contain legacy pale cards`).toBe(0);
  }
});

test("career and technology chips are dark and readable", async ({ page }) => {
  const chipRoutes = ["/", "/systems/tradebot", "/resume"] as const;
  for (const route of chipRoutes) {
    await page.goto(route, { waitUntil: "networkidle" });
    const chips = page.locator(".career-strip i, .system-summary-skills span, .resume-skills span");
    const count = await chips.count();
    if (!count) continue;
    for (let index = 0; index < count; index += 1) {
      const data = await chips.nth(index).evaluate(node => {
        const style = getComputedStyle(node);
        return { bg: style.backgroundColor, color: style.color };
      });
      expect(luminance(data.bg), `${route} chip background should remain dark`).toBeLessThan(100);
      expect(luminance(data.color), `${route} chip text should remain readable`).toBeGreaterThan(120);
    }
  }
});

test("desktop hero columns top-align instead of centering against taller cards", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop composition check");
  for (const route of ["/about", "/collaborate"] as const) {
    await page.goto(route, { waitUntil: "networkidle" });
    const grid = page.locator(".page-hero-grid").first();
    const children = grid.locator(":scope > *");
    await expect(children).toHaveCount(2);
    const left = await children.nth(0).boundingBox();
    const right = await children.nth(1).boundingBox();
    expect(left).not.toBeNull();
    expect(right).not.toBeNull();
    expect(Math.abs((left?.y ?? 0) - (right?.y ?? 0)), `${route} hero columns should start together`).toBeLessThanOrEqual(24);
  }
});

test("About and Collaborate fact grids follow a consistent definition-list rule", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop card structure check");
  for (const route of ["/about", "/collaborate"] as const) {
    await page.goto(route, { waitUntil: "networkidle" });
    const card = page.locator(".about-identity, .collaborate-positioning").first();
    await expect(card).toBeVisible();
    const values = card.locator("dd");
    const count = await values.count();
    expect(count, `${route} should expose structured fact values`).toBeGreaterThanOrEqual(4);
    for (let index = 0; index < count; index += 1) {
      const marginLeft = await values.nth(index).evaluate(node => parseFloat(getComputedStyle(node).marginLeft));
      expect(marginLeft, `${route} dd must not retain browser default indent`).toBeLessThanOrEqual(1);
    }
  }
});

test("desktop headings remain controlled across the site", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop typography check");
  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    const h1 = page.locator("h1").first();
    if (!(await h1.count())) continue;
    const size = await h1.evaluate(node => parseFloat(getComputedStyle(node).fontSize));
    expect(size, `${route} h1 should not overwhelm a 1440px viewport`).toBeLessThanOrEqual(78);
  }
});

test("mobile routes remain readable and navigation is usable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only audit");
  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${route} mobile should not overflow`).toBeLessThanOrEqual(2);
    const h1 = page.locator("h1").first();
    if (await h1.count()) {
      const size = await h1.evaluate(node => parseFloat(getComputedStyle(node).fontSize));
      expect(size, `${route} mobile h1 should remain bounded`).toBeLessThanOrEqual(56);
    }
  }
});

test("global navigation includes current opportunity paths and internal links resolve", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("link", { name: "Collaborate" }).first()).toBeVisible();
  const hrefs = await page.locator('a[href^="/"]').evaluateAll(anchors => [...new Set(anchors.map(anchor => anchor.getAttribute("href")?.split("#")[0]).filter(Boolean))] as string[]);
  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), `${href} should resolve`).toBeLessThan(400);
  }
});
