import { expect, test } from "@playwright/test";

const innerRoutes = [
  "/work.html",
  "/research.html",
  "/journey.html",
  "/resume.html",
  "/pulse.html",
  "/research-opening-session-market-structure.html",
  "/research-rec-md-structural-interaction.html",
  "/research-mean-reversion-candidate.html",
  "/research-evidence-bound-autonomy.html",
  "/systems-analytics.html",
  "/systems-automation.html",
  "/systems-control-core.html",
  "/systems-tradebot.html",
];

const breadcrumbLabels: Record<(typeof innerRoutes)[number], string> = {
  "/work.html": "SELECTED WORK",
  "/research.html": "RESEARCH OVERVIEW",
  "/journey.html": "JOURNEY & APPROACH",
  "/resume.html": "CAREER SNAPSHOT",
  "/pulse.html": "PULSE",
  "/research-opening-session-market-structure.html": "OPENING-SESSION MARKET STRUCTURE",
  "/research-rec-md-structural-interaction.html": "REC-MD STRUCTURAL INTERACTION",
  "/research-mean-reversion-candidate.html": "MEAN REVERSION CANDIDATE",
  "/research-evidence-bound-autonomy.html": "EVIDENCE-BOUND AUTONOMY",
  "/systems-analytics.html": "ANALYTICS LAB",
  "/systems-automation.html": "AUTOMATION SYSTEMS",
  "/systems-control-core.html": "AIXION CONTROL CORE",
  "/systems-tradebot.html": "TRADEBOT SENTINEL",
};

async function openInnerPage(page: import("@playwright/test").Page, route: string) {
  await page.goto(route, { waitUntil: "commit" });
  await expect(page.locator("body.editorial-page")).toBeVisible();
  await page.waitForFunction(() =>
    [...document.styleSheets].some((sheet) =>
      sheet.href?.includes("subpage-refinements.css") || sheet.href?.includes("editorial-parity.css"),
    ),
  );
  await page.waitForLoadState("load");
}

test("inner pages keep shared navigation and have no horizontal overflow", async ({ page }) => {
  for (const route of innerRoutes) {
    await openInnerPage(page, route);
    await expect(page.locator("body.editorial-page")).toBeVisible();
    await expect(page.locator(".mode-toggle, .header-menu-pill").first()).toBeHidden();
    await expect(page.locator(".mode-toggle, .header-menu-pill").last()).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), route).toBe(true);
  }
});

test("every secondary breadcrumb names the page and aligns with its content edge", async ({ page, request }) => {
  for (const route of innerRoutes) {
    await openInnerPage(page, route);
    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb, route).toBeVisible();
    await expect(breadcrumb.locator("span").last(), route).toHaveText(breadcrumbLabels[route]);

    const homeLink = breadcrumb.getByRole("link", { name: "AIXION LAB" });
    const homeHref = await homeLink.getAttribute("href");
    expect(homeHref, `${route} breadcrumb home link`).toBeTruthy();
    const homeResponse = await request.get(new URL(homeHref!, page.url()).toString());
    expect(homeResponse.status(), `${route} breadcrumb home destination`).toBeLessThan(400);

    // The Lab page is explicitly locked; check its breadcrumb semantics above,
    // but do not turn its existing mobile geometry into a source-change target.
    if (route === "/about.html") continue;

    const breadcrumbBox = await homeLink.boundingBox();
    const pageEyebrow = page.locator("main .editorial-hero__content .eyebrow, main .hero_eyebrow, main .eyebrow").first();
    await expect(pageEyebrow, `${route} page eyebrow`).toBeVisible();
    const contentBox = await pageEyebrow.boundingBox();
    expect(breadcrumbBox && contentBox, route).not.toBeNull();
    const tolerance = Math.max(6, (page.viewportSize()?.width ?? 0) * 0.005);
    expect(Math.abs((breadcrumbBox?.x ?? 0) - (contentBox?.x ?? 0)), `${route} breadcrumb/content edge`)
      .toBeLessThanOrEqual(tolerance);
  }
});

test("inner pages use active native scrolling and shared reveal motion", async ({ page }) => {
  for (const route of innerRoutes) {
    await openInnerPage(page, route);
    await expect(page.locator("html")).toHaveClass(/subpage-native-scroll/);
    await expect(page.locator("body")).toHaveClass(/subpage-motion-ready/);
    await expect(page.locator('script[src*="lenis.min.js"]')).toHaveCount(0);
    await expect(page.locator('script[src*="subpage-motion.js?v=13"]')).toHaveCount(1);

    await page.evaluate(() => window.scrollTo(0, 0));
    const viewport = page.viewportSize()!;
    await page.mouse.move(viewport.width / 2, viewport.height / 2);
    await page.mouse.wheel(0, 650);
    await expect.poll(() => page.evaluate(() => window.scrollY), { message: route }).toBeGreaterThan(0);
  }
});

test("changing to reduced motion during a visit reveals content without runtime errors", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await openInnerPage(page, "/research.html");
  await expect(page.locator("body")).toHaveClass(/subpage-motion-gsap/);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  await expect(page.locator("main .subpage-reveal").first()).toHaveCSS("opacity", "1");
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  expect(pageErrors).toEqual([]);
});

test("all inner pages can scroll from top to bottom and back without a trapped scroll region", async ({ page }) => {
  for (const route of innerRoutes) {
    await openInnerPage(page, route);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.mouse.wheel(0, 900);
    await expect.poll(() => page.evaluate(() => window.scrollY), { message: `${route} scrolls down` }).toBeGreaterThan(0);
    await page.mouse.wheel(0, 100_000);
    await expect.poll(
      () => page.evaluate(() => window.scrollY + window.innerHeight >= document.scrollingElement!.scrollHeight - 4),
      { message: `${route} reaches its page end`, timeout: 12_000 },
    ).toBe(true);
    const bottom = await page.evaluate(() => window.scrollY);
    // Let the simulated wheel settle before sending the opposite-direction
    // input; otherwise browsers can coalesce the two rapid wheel gestures.
    await page.waitForTimeout(300);
    await page.mouse.wheel(0, -900);
    await expect.poll(() => page.evaluate(() => window.scrollY), { message: `${route} scrolls back up` }).toBeLessThan(bottom);
  }
});

test("Journey detail uses the available width and its tabs remain keyboard accessible", async ({ page }) => {
  await openInnerPage(page, "/journey.html");
  const panel = page.locator("#journey-stage-panel");
  const panelBox = await panel.boundingBox();
  const spectrumBox = await page.locator(".journey-spectrum").boundingBox();
  const bodyBox = await page.locator(".journey-spectrum__body").boundingBox();
  expect(panelBox && spectrumBox && panelBox.width / spectrumBox.width).toBeGreaterThan(0.9);
  expect(bodyBox && panelBox && bodyBox.width / panelBox.width).toBeGreaterThan(0.45);

  const automationTab = page.getByRole("tab", { name: "Automation" });
  await automationTab.click();
  await expect(automationTab).toHaveAttribute("aria-selected", "true");
  await automationTab.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Software Engineering" })).toHaveAttribute("aria-selected", "true");
  await expect(panel.locator("h3")).toHaveText("Software Engineering");
});

test("inner footer aligns to the page gutter without shifting the footer section", async ({ page }) => {
  for (const route of innerRoutes) {
    await openInnerPage(page, route);
    const main = await page.locator("main").boundingBox();
    const footerInner = await page.locator(".site-footer__main").boundingBox();
    expect(main && footerInner, route).not.toBeNull();
    expect(Math.abs((main?.x ?? 0) - (footerInner?.x ?? 0)), route).toBeLessThanOrEqual(2);
  }
});

test("Work and Research use the available right-hand content column", async ({ page }) => {
  await openInnerPage(page, "/work.html");
  const workHero = page.locator(".editorial-hero__content");
  const workHeroTitle = await workHero.locator(":scope > h1").boundingBox();
  const workHeroCopy = await workHero.locator(":scope > .editorial-hero__copy").boundingBox();
  const workHeroBox = await workHero.boundingBox();
  expect(workHeroTitle && workHeroCopy && workHeroBox).not.toBeNull();
  if ((page.viewportSize()?.width ?? 0) > 900) {
    expect(workHeroCopy?.x).toBeGreaterThan((workHeroTitle?.x ?? 0) + (workHeroTitle?.width ?? 0));
    expect((workHeroCopy?.width ?? 0) / (workHeroBox?.width ?? 1)).toBeGreaterThan(0.25);
  } else {
    expect(Math.abs((workHeroCopy?.x ?? 0) - (workHeroTitle?.x ?? 0))).toBeLessThanOrEqual(4);
    expect(workHeroCopy?.y).toBeGreaterThanOrEqual((workHeroTitle?.y ?? 0) + (workHeroTitle?.height ?? 0));
  }

  if ((page.viewportSize()?.width ?? 0) <= 700) {
    for (const story of await page.locator(".work-story__copy").all()) {
      const layout = await story.evaluate((element) => {
        const style = getComputedStyle(element);
        const copy = element.querySelector("h2")!.getBoundingClientRect();
        const metadata = element.querySelector(".work-story__meta")!.getBoundingClientRect();
        const description = element.querySelector("p:not(.eyebrow)")!.getBoundingClientRect();
        return {
          columns: style.gridTemplateColumns,
          width: element.getBoundingClientRect().width,
          copyWidth: copy.width,
          metadataWidth: metadata.width,
          descriptionWidth: description.width,
        };
      });
      expect(layout.columns.split(" ")).toHaveLength(1);
      expect(layout.copyWidth / layout.width).toBeGreaterThan(0.85);
      expect(layout.metadataWidth / layout.width).toBeGreaterThan(0.85);
      expect(layout.descriptionWidth / layout.width).toBeGreaterThan(0.85);
    }
  }
  const workHeading = await page.locator(".work-end__inner h2").boundingBox();
  const workAction = await page.locator(".work-end__inner .button").boundingBox();
  expect(workHeading && workAction).not.toBeNull();
  if ((page.viewportSize()?.width ?? 0) > 900) {
    const headingCenter = (workHeading?.y ?? 0) + (workHeading?.height ?? 0) / 2;
    const actionCenter = (workAction?.y ?? 0) + (workAction?.height ?? 0) / 2;
    expect(Math.abs(headingCenter - actionCenter)).toBeLessThan(28);
    expect(workAction?.x).toBeGreaterThan((workHeading?.x ?? 0) + (workHeading?.width ?? 0) * 0.55);
  }

  await openInnerPage(page, "/research.html");
  const researchCopy = await page.locator(".research-feature__copy").boundingBox();
  const researchSignal = await page.locator(".research-feature__signal").boundingBox();
  expect(researchCopy && researchSignal).not.toBeNull();
  if ((page.viewportSize()?.width ?? 0) > 900) {
    expect(researchSignal?.x).toBeGreaterThan((researchCopy?.x ?? 0) + (researchCopy?.width ?? 0));
  } else {
    expect(researchSignal?.y).toBeGreaterThanOrEqual((researchCopy?.y ?? 0) + (researchCopy?.height ?? 0));
  }

  await openInnerPage(page, "/resume.html");
  await expect(page.locator(".career-capability-cta").first()).toHaveCSS("text-decoration-line", "none");
});

test("Work header and evidence rows stay aligned at wide monitor dimensions", async ({ page }) => {
  await page.setViewportSize({ width: 2196, height: 1548 });
  await openInnerPage(page, "/work.html");

  const main = await page.locator("main").boundingBox();
  const header = await page.locator(".site-header__inner").boundingBox();
  expect(main && header).not.toBeNull();
  expect(Math.abs((main?.x ?? 0) - (header?.x ?? 0))).toBeLessThanOrEqual(2);
  expect(Math.abs(((main?.x ?? 0) + (main?.width ?? 0)) - ((header?.x ?? 0) + (header?.width ?? 0)))).toBeLessThanOrEqual(2);

  const firstStory = page.locator(".work-story").first();
  const card = await firstStory.boundingBox();
  const evidenceRows = await firstStory.locator("dl > div").evaluateAll((rows) => rows.map((row) => {
    const box = row.getBoundingClientRect();
    const label = row.querySelector("dt")!.getBoundingClientRect();
    const detail = row.querySelector("dd")!.getBoundingClientRect();
    return { top: box.top, bottom: box.bottom, right: box.right, labelWidth: label.width, detailWidth: detail.width };
  }));
  expect(evidenceRows).toHaveLength(2);
  expect(evidenceRows[0].bottom).toBeLessThanOrEqual(evidenceRows[1].top + 1);
  expect(evidenceRows[1].right).toBeLessThanOrEqual((card?.x ?? 0) + (card?.width ?? 0) - 24);
  expect(evidenceRows.every((row) => row.labelWidth >= 100 && row.detailWidth >= 250)).toBe(true);
});

test("Work featured cards keep evidence metadata close and size to their content", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await openInnerPage(page, "/work.html");

  const stories = page.locator(".work-story");
  await expect(stories).toHaveCount(2);
  const storyTitlePhrases = ["—and what they do not.", "a context and a boundary."];
  for (const [index, story] of (await stories.all()).entries()) {
    const metrics = await story.evaluate((card) => {
      const box = card.getBoundingClientRect();
      const copy = card.querySelector<HTMLElement>(".work-story__copy")!;
      const secondaryTitle = card.querySelector<HTMLElement>(".work-story__title-secondary")!;
      const meta = card.querySelector<HTMLElement>(".work-story__meta")!;
      const state = meta.querySelector<HTMLElement>(".work-story__state")!;
      const list = meta.querySelector<HTMLElement>("dl")!;
      const firstRow = list.querySelector<HTMLElement>("div")!;
      const action = meta.querySelector<HTMLElement>(".editorial-link")!;
      const cardStyle = getComputedStyle(card);
      const metaBox = meta.getBoundingClientRect();
      const stateBox = state.getBoundingClientRect();
      const listBox = list.getBoundingClientRect();
      const rowBox = firstRow.getBoundingClientRect();
      const actionBox = action.getBoundingClientRect();
      return {
        cardHeight: box.height,
        minHeight: cardStyle.minHeight,
        titleText: card.querySelector("h2")!.textContent?.replace(/\s+/g, " ").trim(),
        secondaryPhrase: secondaryTitle.textContent,
        secondaryDisplay: getComputedStyle(secondaryTitle).display,
        secondaryColor: getComputedStyle(secondaryTitle).color,
        metadataGap: listBox.top - stateBox.bottom,
        metadataRightInset: box.right - metaBox.right,
        firstRowWithinList: rowBox.top >= listBox.top,
        actionAfterList: actionBox.top >= listBox.bottom,
        columns: getComputedStyle(copy).gridTemplateColumns,
      };
    });

    expect(metrics.metadataGap).toBeGreaterThanOrEqual(16);
    expect(metrics.metadataGap).toBeLessThanOrEqual(24);
    expect(metrics.metadataRightInset).toBeGreaterThanOrEqual(16);
    expect(metrics.firstRowWithinList).toBe(true);
    expect(metrics.actionAfterList).toBe(true);
    expect(metrics.secondaryPhrase).toBe(storyTitlePhrases[index]);
    expect(metrics.secondaryDisplay).toBe("block");
    expect(metrics.secondaryColor).toBe("rgb(102, 102, 102)");
    expect(metrics.minHeight).toBe("0px");
    expect(metrics.cardHeight).toBeLessThan(430);
    expect(metrics.columns.split(" ")).toHaveLength(2);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await openInnerPage(page, "/work.html");
  for (const story of await page.locator(".work-story").all()) {
    const layout = await story.locator(".work-story__copy").evaluate((copy) => {
      const styles = getComputedStyle(copy);
      const card = copy.closest(".work-story")!.getBoundingClientRect();
      const meta = copy.querySelector<HTMLElement>(".work-story__meta")!.getBoundingClientRect();
      const list = copy.querySelector<HTMLElement>("dl")!.getBoundingClientRect();
      return {
        columns: styles.gridTemplateColumns,
        metaLeftInset: meta.left - card.left,
        metaRightInset: card.right - meta.right,
        listWidth: list.width,
        metaWidth: meta.width,
      };
    });
    expect(layout.columns.split(" ")).toHaveLength(1);
    expect(layout.metaLeftInset).toBeGreaterThanOrEqual(12);
    expect(layout.metaRightInset).toBeGreaterThanOrEqual(12);
    expect(layout.listWidth / layout.metaWidth).toBeGreaterThan(0.9);
  }
});

test("overview hero headings preserve exact copy and mute their semantic second phrases", async ({ page }) => {
  const headlines = [
    { route: "/work.html", heading: "Built around hard questions.", secondary: "hard questions." },
    { route: "/research.html", heading: "Engineering answers to difficult questions.", secondary: "to difficult questions." },
    { route: "/journey.html", heading: "The tools changed. The standard stayed.", secondary: "The standard stayed." },
  ];

  for (const item of headlines) {
    await openInnerPage(page, item.route);
    const heading = page.locator(".editorial-hero__content h1");
    const secondary = heading.locator(".editorial-hero__title-secondary");
    await expect(heading).toHaveText(item.heading);
    await expect(secondary).toHaveText(item.secondary);
    await expect(secondary).toHaveCSS("display", "block");
    await expect(secondary).toHaveCSS("color", "rgb(102, 102, 102)");
  }
});

test("editable inner-page hero headings keep a white first line and muted continuation", async ({ page }) => {
  for (const route of innerRoutes.filter((item) => item !== "/about.html")) {
    await openInnerPage(page, route);
    const heading = page.locator("main .editorial-hero__content h1").first();
    await expect(heading, route).toBeVisible();
    await expect(heading, `${route} continuation color`).toHaveCSS("color", "rgb(102, 102, 102)");
    const firstLineColor = await heading.evaluate((element) => getComputedStyle(element, "::first-line").color);
    expect(firstLineColor, `${route} first line color`).toBe("rgb(255, 255, 255)");
  }
});

test("Research and Approach use the open right column without breaking mobile flow", async ({ page }) => {
  await openInnerPage(page, "/research.html");
  const researchHeading = page.locator(".editorial-heading").last();
  const researchTitle = await researchHeading.locator("h2").boundingBox();
  const researchCopy = await researchHeading.locator(".editorial-heading__copy").boundingBox();
  expect(researchTitle && researchCopy).not.toBeNull();

  if ((page.viewportSize()?.width ?? 0) > 900) {
    expect(researchCopy?.x).toBeGreaterThan((researchTitle?.x ?? 0) + (researchTitle?.width ?? 0) * 0.55);
    expect(Math.abs((researchCopy?.y ?? 0) - (researchTitle?.y ?? 0))).toBeLessThan(180);
  } else {
    expect(researchCopy?.y).toBeGreaterThanOrEqual((researchTitle?.y ?? 0) + (researchTitle?.height ?? 0));
  }

  await openInnerPage(page, "/journey.html");
  const approach = page.locator(".image-story__copy");
  const approachTitle = await approach.locator("h2").boundingBox();
  const approachBody = await approach.locator(".image-story__body").boundingBox();
  const approachAction = await approach.locator(".editorial-link").boundingBox();
  expect(approachTitle && approachBody && approachAction).not.toBeNull();

  if ((page.viewportSize()?.width ?? 0) > 900) {
    expect(approachBody?.x).toBeGreaterThan((approachTitle?.x ?? 0) + (approachTitle?.width ?? 0) * 0.55);
    expect(approachAction?.x).toBeGreaterThan((approachTitle?.x ?? 0) + (approachTitle?.width ?? 0) * 0.55);
  } else {
    expect(approachBody?.y).toBeGreaterThanOrEqual((approachTitle?.y ?? 0) + (approachTitle?.height ?? 0));
    expect(approachAction?.y).toBeGreaterThanOrEqual((approachBody?.y ?? 0) + (approachBody?.height ?? 0));
  }
});

test("Research archive state labels are separated from their explanations", async ({ page }) => {
  await openInnerPage(page, "/research.html");
  const stateReasons = page.locator(".research-state-reason");
  await expect(stateReasons).toHaveCount(4);

  for (const reason of await stateReasons.all()) {
    await expect(reason).toContainText(/^Why this state:\s+\S/);
  }
});

test("the scroll motion does not skew whole content sections", async ({ page }) => {
  await openInnerPage(page, "/work.html");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
  await page.waitForTimeout(700);
  const sectionTransforms = await page.locator("main > section, main > #work-stories > article").evaluateAll((sections) =>
    sections.map((section) => (section as HTMLElement).style.transform).filter(Boolean),
  );
  expect(sectionTransforms).toEqual([]);
});
