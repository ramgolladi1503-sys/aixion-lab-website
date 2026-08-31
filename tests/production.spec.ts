import { test, expect } from "@playwright/test";

const productionRoutes = [
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
] as const;

test("production routes load without browser errors", async ({ page }) => {
  const browserErrors: string[] = [];
  page.on("pageerror", error => browserErrors.push(`pageerror: ${error.message}`));
  page.on("console", message => {
    if (message.type() === "error") browserErrors.push(`console: ${message.text()}`);
  });

  for (const route of productionRoutes) {
    browserErrors.length = 0;
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status(), `${route} should return a successful response`).toBeLessThan(400);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S+/);
    expect(browserErrors, `${route} should not emit browser errors`).toEqual([]);
  }
});

test("all internal navigation links resolve", async ({ page, request }) => {
  const discovered = new Set<string>();

  for (const route of ["/", "/systems", "/research", "/journey", "/about", "/resume"]) {
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
    await expect(page.locator(".page-hero .system-hero-summary")).toBeVisible();
    await expect(page.locator(".page-hero .system-visual")).toHaveCount(0);
    await expect(page.locator("#architecture .system-visual")).toBeVisible();
  }
});

test("career snapshot is launch-ready and printable", async ({ page }) => {
  await page.goto("/resume", { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "Print / Save PDF" }).first()).toBeVisible();
  await expect(page.getByText("Live web version")).toBeVisible();
  const text = (await page.locator("body").innerText()).toLowerCase();
  expect(text).not.toContain("publication pending");
  expect(text).not.toContain("will be added");
  expect(text).not.toContain("build preview");
});

test("mobile navigation closes after route change", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const menu = page.locator("details.mobile-menu");
  await menu.locator("summary").click();
  await expect(menu).toHaveAttribute("open", "");
  await menu.getByRole("link", { name: "Research" }).click();
  await expect(page).toHaveURL(/\/research$/);
  await expect(menu).not.toHaveAttribute("open", "");
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
  await expect(page.getByRole("heading", { name: "Lost in the Lab?" })).toBeVisible();
  await expect(page.locator(".abstract-scene")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Return home/ })).toBeVisible();
});

test("search palette is visually quiet while retaining keyboard behavior", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Open Aixion search" });
  await expect(trigger).toHaveText("Search");
  await expect(page.getByText("⌘K", { exact: true })).toHaveCount(0);

  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Search Aixion" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/select · Enter open|Esc close/i)).toHaveCount(0);
  await expect(dialog.getByRole("button", { name: "Close search" })).toHaveText("×");
});

test("Control Core remains centered after first-load reveal", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  const visual = page.locator(".visual-core").first();
  await visual.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);

  const mapBox = await visual.locator(".core-map").boundingBox();
  const centerBox = await visual.locator(".core-center").boundingBox();
  expect(mapBox).not.toBeNull();
  expect(centerBox).not.toBeNull();
  if (!mapBox || !centerBox) return;

  const dx = Math.abs((centerBox.x + centerBox.width / 2) - (mapBox.x + mapBox.width / 2));
  const dy = Math.abs((centerBox.y + centerBox.height / 2) - (mapBox.y + mapBox.height / 2));
  expect(dx).toBeLessThan(3);
  expect(dy).toBeLessThan(3);
});

test("footer closes with an authored principle instead of duplicate navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const footer = page.locator("footer.site-footer");
  await expect(footer.getByText(/Curiosity starts the question/)).toBeVisible();
  await expect(footer.getByText(/Build carefully\. Test what matters\. Learn from what fails\./)).toBeVisible();
  await expect(footer.locator('a[href^="/"]')).toHaveCount(0);
  await expect(footer.locator(".footer-links")).toHaveCount(0);
});
