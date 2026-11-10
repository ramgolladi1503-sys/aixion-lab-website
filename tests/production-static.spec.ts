import { expect, test } from "@playwright/test";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const canonicalRoutes = [
  "/", "/about", "/work", "/research", "/journey", "/pulse", "/resume",
  "/systems/tradebot", "/systems/control-core", "/systems/automation", "/systems/analytics",
  "/research/evidence-bound-autonomy", "/research/mean-reversion-candidate",
  "/research/opening-session-market-structure", "/research/rec-md-structural-interaction",
] as const;

test("export route ownership manifest matches authored sources and generated outputs", async () => {
  const exportRoot = resolve(process.cwd(), "out");
  const manifestText = await readFile(resolve(exportRoot, "redesign-manifest.json"), "utf8");
  const manifest = JSON.parse(manifestText) as {
    schemaVersion: number;
    routes: Array<{ source: string; route: string; outputs: string[]; legacyAlias?: string }>;
  };

  expect(manifest.schemaVersion).toBe(1);
  expect(manifest.routes).toHaveLength(canonicalRoutes.length);
  expect(new Set(manifest.routes.map(({ route }) => route)).size).toBe(manifest.routes.length);
  expect(new Set(manifest.routes.map(({ source }) => source)).size).toBe(manifest.routes.length);
  expect([...manifest.routes.map(({ route }) => route)].sort()).toEqual([...canonicalRoutes].sort());

  for (const entry of manifest.routes) {
    expect(entry.source).toMatch(/^public\/redesign\/[a-z0-9-]+\.html$/i);
    const sourceHtml = await readFile(resolve(process.cwd(), entry.source), "utf8");
    const sourceTitle = sourceHtml.match(/<title>(.*?)<\/title>/i)?.[1];
    expect(sourceTitle, `${entry.source} has a title`).toBeTruthy();

    const canonicalOutput = entry.route === "/" ? "index.html" : `${entry.route.slice(1)}.html`;
    expect(entry.outputs).toContain(canonicalOutput);
    if (entry.route !== "/") expect(entry.outputs).toContain(`${entry.route.slice(1)}/index.html`);
    expect(entry.outputs).toHaveLength(entry.route === "/" ? 1 : 2);

    for (const output of entry.outputs) {
      expect(output.startsWith("/")).toBe(false);
      expect(output.split("/")).not.toContain("..");
      await access(resolve(exportRoot, output));
    }

    const exportedHtml = await readFile(resolve(exportRoot, canonicalOutput), "utf8");
    expect(exportedHtml.match(/<title>(.*?)<\/title>/i)?.[1], entry.route).toBe(sourceTitle);
    expect(exportedHtml.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1], entry.route)
      .toBe(`https://aixionlab.com${entry.route === "/" ? "/" : entry.route}`);

    const hasLegacyDetailAlias = entry.route.startsWith("/systems/")
      || (entry.route.startsWith("/research/") && entry.route !== "/research");
    if (hasLegacyDetailAlias) {
      if (!entry.legacyAlias) throw new Error(`Missing legacy alias for ${entry.route}`);
      expect(entry.legacyAlias).toMatch(/^(systems|research)-[a-z0-9-]+\.html$/i);
      expect(entry.legacyAlias).toBe(entry.source.split("/").pop());
      await access(resolve(exportRoot, entry.legacyAlias));
    } else {
      expect(entry.legacyAlias).toBeUndefined();
    }
  }
});

test("the static export serves the redesigned pages at production routes", async ({ page }) => {
  for (const route of canonicalRoutes) {
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status(), route).toBe(200);
    await expect(page).toHaveTitle(/Aixion Lab|About Ram|Selected Work|Research|Journey|Career/i);
    await expect(page.locator('link[rel="canonical"]'), route).toHaveAttribute(
      "href", `https://aixionlab.com${route === "/" ? "/" : route}`,
    );
    if (route !== "/" && route !== "/about") await expect(page.locator("body.editorial-page"), route).toBeAttached();
  }
});

test("legacy flat detail URLs load the canonical system and research records", async ({ page }) => {
  const aliases = [
    ["/systems-tradebot.html", "https://aixionlab.com/systems/tradebot"],
    ["/systems-control-core.html", "https://aixionlab.com/systems/control-core"],
    ["/systems-automation.html", "https://aixionlab.com/systems/automation"],
    ["/systems-analytics.html", "https://aixionlab.com/systems/analytics"],
    ["/research-opening-session-market-structure.html", "https://aixionlab.com/research/opening-session-market-structure"],
    ["/research-rec-md-structural-interaction.html", "https://aixionlab.com/research/rec-md-structural-interaction"],
    ["/research-mean-reversion-candidate.html", "https://aixionlab.com/research/mean-reversion-candidate"],
    ["/research-evidence-bound-autonomy.html", "https://aixionlab.com/research/evidence-bound-autonomy"],
  ] as const;

  for (const [path, canonical] of aliases) {
    const response = await page.goto(path, { waitUntil: "networkidle" });
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("body.editorial-page")).toBeAttached();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
  }
});

test("Netlify export publishes permanent redirects for retired and preview routes", async ({ request }) => {
  const redirects = [
    ["/systems /work 301!", "/systems"],
    ["/systems/ /work 301!", "/systems/"],
    ["/collaborate /about#contact 301!", "/collaborate"],
    ["/redesign/work.html /work 301!", "/redesign/work.html"],
  ] as const;
  const { readFile } = await import("node:fs/promises");
  const { resolve } = await import("node:path");
  const rules = await readFile(resolve(process.cwd(), "out", "_redirects"), "utf8");
  for (const [rule, route] of redirects) {
    expect(rules.split(/\r?\n/), route).toContain(rule);
  }
});

test("primary-page internal links and redesign assets resolve", async ({ page, request }) => {
  const links = new Set<string>();
  for (const route of ["/", "/about", "/work", "/research", "/journey", "/resume"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const hrefs = await page.locator("a[href^='/']").evaluateAll((anchors) =>
      anchors.map((anchor) => (anchor as HTMLAnchorElement).pathname),
    );
    hrefs.forEach((href) => links.add(href));
  }

  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), `${href} resolves`).toBeLessThan(400);
  }

  for (const asset of [
    "/redesign/kirifuda.css", "/redesign/kirifuda_theme_dark.css", "/redesign/aixion_content.css",
    "/redesign/subpage-refinements.css?v=24", "/redesign/editorial-parity.css?v=9",
    "/redesign/subpage-motion.js?v=13", "/redesign/gsap.min.js", "/redesign/ScrollTrigger.min.js",
    "/Ram-Golladi-Resume.pdf", "/redesign/favicon.svg", "/robots.txt", "/sitemap.xml",
  ]) {
    expect((await request.get(asset)).status(), asset).toBe(200);
  }
});

test("locked homepage and Lab content remain intact, and the secondary footer aligns to the page gutter", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const shuffler = page.locator("#shuffler_stage");
  await expect(shuffler).toBeAttached();
  await expect(shuffler.locator(".card_item")).toHaveCount(6);
  await expect(shuffler).toHaveClass(/animating/);
  await expect(page.locator(".mode-toggle, .header-menu-pill")).toHaveCount(0);
  await expect(page.locator("footer.site-footer")).toHaveCount(0);

  await page.goto("/about", { waitUntil: "networkidle" });
  await expect(page.locator(".editorial-hero h1")).toHaveText("Built by Ram Golladi.");
  await expect(page.locator(".image-story__copy h2")).toHaveText("Quality engineering became a way to build.");
  await expect(page.locator("#contact")).toBeVisible();

  await page.goto("/work", { waitUntil: "networkidle" });
  const columns = await page.locator(".site-footer__main").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
  expect(columns).toBe(testInfo.project.name === "mobile" ? 1 : 3);
  const mainContent = await page.locator("main .page-width").first().boundingBox();
  const footerContent = await page.locator(".site-footer__main").boundingBox();
  expect(mainContent && footerContent).not.toBeNull();
  expect(Math.abs((mainContent?.x ?? 0) - (footerContent?.x ?? 0))).toBeLessThanOrEqual(2);
});

test("TradeBot labels its telemetry dashboard as illustrative and contains no fabricated returns", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator('#sentinel [role="note"]')).toContainText("ILLUSTRATIVE INTERFACE · SYNTHETIC VALUES · NOT LIVE TELEMETRY");
  await expect(page.locator("#sentinel")).toContainText("not live measurements or trading results");
  await expect(page.locator("#sentinel")).not.toContainText("$42.8M");
  await expect(page.locator("#sentinel")).not.toContainText("Sub-Millisecond Microstructure Telemetry");
  await expect(page.locator("#sentinel")).toContainText("NO LIVE POSITION");
});
