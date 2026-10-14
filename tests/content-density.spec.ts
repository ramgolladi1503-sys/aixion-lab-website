import { test, expect } from "@playwright/test";

test("key supporting statements stay on one line on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop single-line layout assertion");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });

  for (const selector of [".home-practice__intro h2", ".home-business__note"]) {
    const textLayout = await page.locator(selector).evaluate((element) => {
      const style = getComputedStyle(element);
      return { height: element.getBoundingClientRect().height, lineHeight: parseFloat(style.lineHeight) };
    });
    expect(textLayout.height).toBeLessThanOrEqual(textLayout.lineHeight + 1);
  }

  await page.goto("/journey", { waitUntil: "networkidle" });
  const disclaimer = page.locator(".journey-intro .editorial-heading__copy");
  const textLayout = await disclaimer.evaluate((element) => {
    const style = getComputedStyle(element);
    return { height: element.getBoundingClientRect().height, lineHeight: parseFloat(style.lineHeight) };
  });
  expect(textLayout.height).toBeLessThanOrEqual(textLayout.lineHeight + 1);
  await expect(page.getByText(/Select a stage to follow the progression/)).toHaveCount(0);
});

test("internal AX-SYS identifiers are absent from visible work and system pages", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Identifier visibility is viewport independent");
  for (const route of ["/work", "/systems/tradebot"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const visibleText = await page.locator("body").innerText();
    expect(visibleText).not.toMatch(/AX-SYS-00[1-4]/);
  }
});

test("TradeBot next gate stays inline and timeline summaries remain readable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop single-line layout assertion");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/systems/tradebot", { waitUntil: "domcontentloaded" });

  const nextGate = page.locator(".next-gate h2");
  await expect(nextGate).toHaveText("Public-safe operational evidence review.");
  const gateLayout = await nextGate.evaluate((element) => ({
    height: element.getBoundingClientRect().height,
    lineHeight: parseFloat(getComputedStyle(element).lineHeight),
  }));
  expect(gateLayout.height).toBeLessThanOrEqual(gateLayout.lineHeight + 1);

  const summaryFontSize = await page.locator(".system-timeline strong").first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
  expect(summaryFontSize).toBeGreaterThanOrEqual(16);

  const footer = page.locator(".site-footer");
  await expect(footer).toContainText("Independent applied-engineering lab");
  expect(await footer.locator(".site-footer__identity > .eyebrow").evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(12);
  expect(await footer.locator(".site-footer__contact > span").evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(15);
});
