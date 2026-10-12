import { test, expect } from "@playwright/test";

const productionRoutes = [
  "/", "/work", "/systems", "/systems/tradebot", "/systems/control-core", "/systems/automation", "/systems/analytics",
  "/research", "/research/opening-session-market-structure", "/research/rec-md-structural-interaction",
  "/research/mean-reversion-candidate", "/research/evidence-bound-autonomy", "/pulse", "/journey", "/about", "/resume",
] as const;

test("production routes load without browser errors", async ({ page }) => {
  let activeRoute = "";
  const routeErrors = new Map<string, string[]>();
  const record = (message: string) => {
    const errors = routeErrors.get(activeRoute) ?? [];
    errors.push(message);
    routeErrors.set(activeRoute, errors);
  };
  page.on("pageerror", error => record(`pageerror: ${error.message}`));
  page.on("console", message => { if (message.type() === "error") record(`console: ${message.text()}`); });
  for (const route of productionRoutes) {
    activeRoute = route;
    routeErrors.set(route, []);
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status(), `${route} should return a successful response`).toBeLessThan(400);
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S+/);
  }
  const failures = [...routeErrors.entries()].filter(([, errors]) => errors.length > 0).map(([route, errors]) => `${route}: ${errors.join(" | ")}`);
  expect(failures, "Production routes should not emit browser errors").toEqual([]);
});

test("all internal navigation links resolve", async ({ page, request }) => {
  const discovered = new Set<string>();
  for (const route of ["/", "/work", "/systems", "/research", "/journey", "/about", "/resume"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const hrefs = await page.locator('a[href^="/"]').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute("href")).filter(Boolean) as string[]);
    hrefs.forEach(href => discovered.add(href.split("#")[0] || "/"));
  }
  for (const href of discovered) {
    const response = await request.get(href);
    expect(response.status(), `${href} should resolve`).toBeLessThan(400);
  }
});

test("system detail heroes do not duplicate architecture visuals", async ({ page }) => {
  for (const route of ["/systems/tradebot", "/systems/control-core", "/systems/automation", "/systems/analytics"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(".editorial-hero h1")).toBeVisible();
    await expect(page.locator(".editorial-hero .system-visual")).toHaveCount(0);
    await expect(page.locator("#architecture .image-story")).toHaveCount(1);
    await expect(page.locator("#architecture .signal-line")).toBeVisible();
  }
});

test("career snapshot is honest about résumé publication status", async ({ page }) => {
  await page.goto("/resume", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Career snapshot" })).toBeVisible();
  await expect(page.getByText("A downloadable résumé is not published here.")).toBeVisible();
  const text = (await page.locator("body").innerText()).toLowerCase();
  expect(text).not.toContain("publication pending");
  expect(text).not.toContain("will be added");
  expect(text).not.toContain("build preview");
});

test("shared menu closes after route change", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const trigger = page.locator(".site-menu__trigger");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Explore Aixion Lab" }).getByRole("link", { name: /Research/ }).click();
  await expect(page).toHaveURL(/\/research$/);
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
});

test("metadata endpoints are published", async ({ request }) => {
  for (const path of ["/robots.txt", "/sitemap.xml", "/manifest.webmanifest", "/icon.svg"]) {
    const response = await request.get(path);
    expect(response.status(), `${path} should be published`).toBe(200);
  }
});

test("custom 404 is branded and legacy abstract scene is absent", async ({ page }) => {
  const response = await page.goto("/route-that-does-not-exist", { waitUntil: "networkidle" });
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Not this way." })).toBeVisible();
  await expect(page.locator(".abstract-scene")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Return home/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Browse work/ })).toHaveAttribute("href", "/work");
});

test("site menu exposes four focused destinations without a search palette", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Menu" });
  await expect(page.getByRole("button", { name: /search/i })).toHaveCount(0);
  await trigger.click();
  const menu = page.getByRole("navigation", { name: "Explore Aixion Lab" });
  await expect(menu.getByRole("link")).toHaveCount(4);
  await expect(menu.getByRole("link")).toHaveText([
    /The Lab/,
    /Selected Work/,
    /Research/,
    /Approach/,
  ]);
});

test("system detail pages expose readable architecture stages on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const checks = [
    ["/systems/tradebot", 5],
    ["/systems/control-core", 7],
    ["/systems/automation", 5],
    ["/systems/analytics", 5],
  ] as const;
  for (const [route, count] of checks) {
    await page.goto(route, { waitUntil: "networkidle" });
    const stages = page.locator("#architecture .signal-line li");
    await expect(stages).toHaveCount(count);
    await stages.first().scrollIntoViewIfNeeded();
    for (let index = 0; index < count; index += 1) {
      await expect(stages.nth(index)).toBeVisible();
      const box = await stages.nth(index).boundingBox();
      expect(box?.width ?? 0).toBeGreaterThan(150);
      expect(box?.height ?? 0).toBeGreaterThan(30);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test("research index explains why each public note has its state", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  const rows = page.locator(".research-row");
  await expect(rows).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    await expect(rows.nth(index).locator(".research-state-reason")).toContainText("Why this state");
  }
});

test("footer closes with the new site structure and clear contact path", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const footer = page.locator("footer.site-footer");
  await expect(footer.locator(".site-footer__statement")).toHaveText("Research, build, validate, learn.");
  const links = footer.getByRole("navigation", { name: "Footer navigation" });
  await expect(links.getByRole("link")).toHaveText(["The Lab", "Work", "Research", "Approach", "Career snapshot"]);
  await expect(footer.getByRole("link", { name: "Start a conversation ↗" })).toHaveAttribute("href", "/about#contact");
});
