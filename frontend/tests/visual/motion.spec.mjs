import { test, expect } from '@playwright/test';

async function seedEntered(page) {
  await page.addInitScript(() => sessionStorage.setItem('aixion-entered-v4', '1'));
}

test('route portal completes quickly and reveals destination through one continuous transition', async ({ page }) => {
  await seedEntered(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const portal = page.locator('.route-portal');
  await page.getByRole('button', { name: 'Open Research' }).click({ force: true });
  await expect(portal).toBeVisible();
  const transitionStart = Date.now();
  await expect(portal).toBeHidden();
  const transitionElapsed = Date.now() - transitionStart;
  expect(transitionElapsed).toBeGreaterThan(250);
  expect(transitionElapsed).toBeLessThan(1400);
  await expect(page).toHaveURL(/\/research$/);
  await expect(page.locator('.world-research')).toBeVisible();
});

test('background field remains active in normal motion mode', async ({ page }) => {
  await seedEntered(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const canvas = page.locator('.computational-field');
  await expect(canvas).toBeVisible();
  const first = await canvas.screenshot();
  await page.waitForTimeout(420);
  const second = await canvas.screenshot();
  expect(Buffer.compare(first, second)).not.toBe(0);
});

test('TradeBot sticky system progresses through all five scroll states', async ({ page }) => {
  await seedEntered(page);
  await page.goto('/projects/tradebot', { waitUntil: 'domcontentloaded' });
  for (let index = 0; index < 5; index += 1) {
    const stage = page.locator(`#${['tradebot-ingest','tradebot-research','tradebot-govern','tradebot-observe','tradebot-prove'][index]}`);
    await stage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(220);
    await expect(page.locator('.tradebot-system')).toHaveClass(new RegExp(`stage-${index}`));
  }
});

test('Deep Space uses an endless five-word depth sequence over an active warp field', async ({ page }) => {
  await seedEntered(page);
  await page.goto('/core', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.deep-space')).toBeVisible();
  await expect(page.locator('.deep-word')).toHaveCount(5);
  await expect(page.locator('.deep-word.word-0')).toHaveText('END');
  await expect(page.locator('.deep-word.word-4')).toHaveText('BEGINNING');

  await page.waitForTimeout(140);
  const initiallyVisibleWords = await page.locator('.deep-word').evaluateAll((nodes) => nodes.filter((node) => Number(getComputedStyle(node).opacity) > 0.05).map((node) => node.textContent));
  expect(initiallyVisibleWords).toHaveLength(1);
  expect(initiallyVisibleWords[0]).toBe('END');

  const canvas = page.locator('.deep-space canvas');
  const first = await canvas.screenshot();
  await page.waitForTimeout(360);
  const second = await canvas.screenshot();
  expect(Buffer.compare(first, second)).not.toBe(0);
  const animated = await page.locator('.deep-word').evaluateAll((nodes) => nodes.some((node) => {
    const style = getComputedStyle(node);
    return Number(style.opacity) > 0.05;
  }));
  expect(animated).toBeTruthy();
});
