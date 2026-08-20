import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const RUN_ID = process.env.VISUAL_RUN_ID || process.env.GITHUB_SHA?.slice(0, 12) || 'current';
const OUT = path.join(process.cwd(), 'test-results', 'visual-evidence', RUN_ID);

const ROUTES = [
  ['05-about-current.png', '/about'],
  ['06-journey-current.png', '/journey'],
  ['07-projects-current.png', '/projects'],
  ['08-tradebot-current.png', '/projects/tradebot'],
  ['09-research-current.png', '/research'],
  ['10-evidence-current.png', '/evidence'],
  ['11-control-tower-current.png', '/control-tower'],
  ['12-stack-current.png', '/stack'],
  ['13-contact-current.png', '/contact'],
];

const TRADEBOT_STAGES = [
  ['08a-tradebot-ingest-current.png', 'tradebot-ingest'],
  ['08b-tradebot-research-current.png', 'tradebot-research'],
  ['08c-tradebot-govern-current.png', 'tradebot-govern'],
  ['08d-tradebot-observe-current.png', 'tradebot-observe'],
  ['08e-tradebot-prove-current.png', 'tradebot-prove'],
];

function ensureOut() { fs.mkdirSync(OUT, { recursive: true }); }

async function gotoState(page, route, selector = 'main') {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await expect(page.locator(selector).first()).toBeVisible();
  await page.waitForTimeout(500);
}

async function revealScrollableContent(page) {
  const metrics = await page.evaluate(() => ({ height: document.documentElement.scrollHeight, viewport: window.innerHeight }));
  const step = Math.max(460, Math.round(metrics.viewport * .72));
  for (let y = 0; y < metrics.height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(240);
}

async function shot(page, name, fullPage = false) {
  ensureOut();
  await page.screenshot({ path: path.join(OUT, name), fullPage });
}

async function captureTradeBotStages(page) {
  for (const [name, id] of TRADEBOT_STAGES) {
    const stage = page.locator(`#${id}`);
    await stage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(320);
    await shot(page, name, false);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

test('capture governed V4 visual matrix', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-motion', 'Visual evidence is captured once in the authoritative normal-motion Chromium project.');
  test.setTimeout(180_000);
  ensureOut();

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.removeItem('aixion-entered-v4'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('.entry-screen')).toBeVisible();
  await shot(page, '01-entry-current.png');

  await page.evaluate(() => sessionStorage.setItem('aixion-entered-v4', '1'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('.home-orbit')).toBeVisible();
  await page.waitForTimeout(650);
  await shot(page, '02-home-current.png');

  await page.getByRole('button', { name: 'Open Projects' }).hover({ force: true });
  await page.waitForTimeout(240);
  await shot(page, '03-projects-hover-current.png');

  await page.getByRole('button', { name: 'Open Research' }).hover({ force: true });
  await page.waitForTimeout(240);
  await shot(page, '04-research-hover-current.png');

  for (const [name, route] of ROUTES) {
    await gotoState(page, route);
    await revealScrollableContent(page);
    await shot(page, name, true);
    if (route === '/projects/tradebot') await captureTradeBotStages(page);
  }

  await gotoState(page, '/core');
  await page.waitForTimeout(500);
  await shot(page, '14-core-current.png');

  await page.setViewportSize({ width: 768, height: 1024 });
  await gotoState(page, '/', '.home-orbit');
  await shot(page, '15-tablet-current.png');

  await page.setViewportSize({ width: 390, height: 844 });
  await gotoState(page, '/', '.home-orbit');
  await shot(page, '16-mobile-current.png');

  const metadata = {
    runId: RUN_ID,
    gitSha: process.env.GITHUB_SHA || null,
    motionMode: 'no-preference',
    primaryViewport: { width: 1440, height: 900 },
    responsiveViewports: [{ width: 768, height: 1024 }, { width: 390, height: 844 }],
    screenshotCount: 21,
    governedRoutes: ROUTES.length + 3,
    tradebotStageStates: TRADEBOT_STAGES.map(([, id]) => id),
    note: 'V4 evidence is captured against the production preview with normal motion enabled. Reduced-motion behavior is tested separately.',
  };
  fs.writeFileSync(path.join(OUT, 'capture-manifest.json'), `${JSON.stringify(metadata, null, 2)}\n`);
});
