import { test, expect } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/work",
  "/research",
  "/research/opening-session-market-structure",
  "/research/rec-md-structural-interaction",
  "/research/mean-reversion-candidate",
  "/research/evidence-bound-autonomy",
  "/journey",
  "/collaborate",
  "/pulse",
  "/resume",
  "/systems",
  "/systems/tradebot",
  "/systems/control-core",
  "/systems/automation",
  "/systems/analytics",
  "/page-that-does-not-exist",
];

test("all public routes keep body copy readable and avoid excessive section padding", async ({ page }) => {
  for (const route of publicRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), `${route} should resolve`).toBe(route === "/page-that-does-not-exist" ? 404 : 200);

    const layout = await page.evaluate(() => {
      const readingCopy = [...document.querySelectorAll("main p:not(.eyebrow), main li, main dd, .site-footer p:not(.eyebrow)")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
        })
        .map((element) => ({ text: (element.textContent ?? "").trim().slice(0, 80), size: parseFloat(getComputedStyle(element).fontSize) }));
      const sections = [...document.querySelectorAll("main > section, main > article")]
        .filter((element) => !element.classList.contains("editorial-hero") && !element.classList.contains("home-hero"))
        .map((element) => ({
          name: element.id || element.classList.item(0) || element.tagName.toLowerCase(),
          paddingTop: parseFloat(getComputedStyle(element).paddingTop),
          paddingBottom: parseFloat(getComputedStyle(element).paddingBottom),
        }));

      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        readingCopy,
        sections,
      };
    });

    expect(layout.documentWidth, `${route} should not overflow horizontally`).toBeLessThanOrEqual(layout.viewportWidth + 1);
    for (const copy of layout.readingCopy) {
      expect(copy.size, `${route} reading copy should be at least 16px: ${copy.text}`).toBeGreaterThanOrEqual(16);
    }
    for (const section of layout.sections) {
      expect(section.paddingTop, `${route} ${section.name} top padding`).toBeLessThanOrEqual(90);
      expect(section.paddingBottom, `${route} ${section.name} bottom padding`).toBeLessThanOrEqual(90);
    }
  }
});

test("small interface labels and captions remain readable across public routes", async ({ page }) => {
  const readableLabels = [
    ".site-header .brand-copy strong",
    ".site-header .brand-copy small",
    ".site-header .mode-toggle",
    ".site-header .mode-toggle strong",
    ".site-header .mode-toggle .mode-label",
    ".site-main .scroll-cue",
    ".site-main .story-index",
    ".site-main .journey-spectrum__number",
    ".site-main .signal-line__index",
    ".site-main .research-domain",
    ".site-main .home-work__index",
    ".site-main .work-opening__image > span",
    ".site-main .work-story__image > span",
    ".site-main .system-timeline > div > span",
    ".site-footer .site-footer__base",
  ];

  for (const route of publicRoutes.filter((item) => item !== "/page-that-does-not-exist")) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    for (const selector of readableLabels) {
      const elements = page.locator(selector);
      for (const element of await elements.all()) {
        const layout = await element.evaluate((node) => {
          const style = getComputedStyle(node);
          const rect = node.getBoundingClientRect();
          return {
            visible: rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden",
            text: (node.textContent ?? "").trim().slice(0, 64),
            size: parseFloat(style.fontSize),
          };
        });
        if (layout.visible) {
          expect(layout.size, `${route} ${selector} should be at least 12px: ${layout.text}`).toBeGreaterThanOrEqual(12);
        }
      }
    }
  }
});

test("header remains readable and contained at intermediate desktop widths", async ({ page }) => {
  for (const width of [1100, 1024, 981]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/work", "/journey", "/systems/tradebot"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const layout = await page.evaluate(() => {
        const header = document.querySelector(".site-header");
        const brand = document.querySelector(".site-header .brand");
        const nav = document.querySelector(".site-header .desktop-nav");
        const actions = document.querySelector(".site-header .header-actions");
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          brand: brand?.getBoundingClientRect().toJSON(),
          nav: nav?.getBoundingClientRect().toJSON(),
          actions: actions?.getBoundingClientRect().toJSON(),
          navVisible: !!nav && getComputedStyle(nav).display !== "none",
          actionsVisible: !!actions && getComputedStyle(actions).display !== "none",
          headerHeight: header?.getBoundingClientRect().height ?? 0,
        };
      });
      expect(layout.overflow, `${route} at ${width}px should not overflow`).toBeLessThanOrEqual(1);
      expect(layout.navVisible, `${route} at ${width}px should retain navigation`).toBe(true);
      expect(layout.actionsVisible, `${route} at ${width}px should retain header controls`).toBe(true);
      expect(layout.brand!.right, `${route} at ${width}px brand and actions should not overlap`).toBeLessThanOrEqual(layout.actions!.left + 1);
      expect(layout.nav!.top, `${route} at ${width}px navigation should sit below the header row`).toBeGreaterThan(layout.brand!.top);
      expect(layout.headerHeight).toBeGreaterThan(92);
    }
  }
});
