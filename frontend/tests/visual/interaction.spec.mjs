import { test, expect } from '@playwright/test';

async function seedEntered(page) {
  await page.addInitScript(() => sessionStorage.setItem('aixion-entered-v4', '1'));
}

async function openHome(page) {
  await seedEntered(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.home-orbit')).toBeVisible();
}

function collectPageErrors(page) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

test('home exposes exactly eight governed destinations with one geometry authority', async ({ page }) => {
  const errors = collectPageErrors(page);
  await openHome(page);
  await expect(page.locator('.hub-node')).toHaveCount(8);
  await expect(page.locator('.spoke-line')).toHaveCount(8);
  await expect(page.locator('.spoke-end')).toHaveCount(8);
  for (const name of ['About', 'Journey', 'Projects', 'Research', 'Evidence', 'Control Tower', 'Stack', 'Contact']) {
    await expect(page.getByRole('button', { name: `Open ${name}` })).toBeVisible();
  }
  const size = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    scrollHeight: document.documentElement.scrollHeight,
    innerHeight: window.innerHeight,
  }));
  expect(size.scrollWidth).toBeLessThanOrEqual(size.innerWidth + 2);
  expect(size.scrollHeight).toBeLessThanOrEqual(size.innerHeight + 2);
  expect(errors).toEqual([]);
});

test('cinematic route transition resolves, browser back works, and header home is visible', async ({ page }) => {
  await openHome(page);
  const homeControl = page.getByRole('button', { name: 'Home', exact: true });
  await expect(homeControl).toBeVisible();

  await page.getByRole('button', { name: 'Open Projects' }).click({ force: true });
  await expect(page.locator('.route-portal')).toBeVisible();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator('.world-projects')).toBeVisible();
  await expect(page.locator('.route-portal')).toBeHidden();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.home-orbit')).toBeVisible();

  await page.getByRole('button', { name: 'Open Evidence' }).click({ force: true });
  await expect(page.locator('.route-portal')).toBeVisible();
  await expect(page).toHaveURL(/\/evidence$/);
  await expect(page.locator('.world-evidence')).toBeVisible();
  await expect(page.locator('.route-portal')).toBeHidden();

  await page.getByRole('button', { name: 'Aixion Lab home' }).click({ force: true });
  await expect(page.locator('.route-portal')).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.home-orbit')).toBeVisible();
  await expect(page.locator('.route-portal')).toBeHidden();
});

test('Aixion Core supports keyboard entry and immediate Escape exit', async ({ page }) => {
  await openHome(page);
  const core = page.getByRole('button', { name: /Aixion Core/i });
  await core.focus();
  await core.press('Enter');
  await expect(page).toHaveURL(/\/core$/);
  await expect(page.locator('.app.is-deep')).toBeVisible();
  await expect(page.locator('.deep-word')).toHaveCount(5);
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.home-orbit')).toBeVisible();
});

test('TradeBot exposes all five governed narrative stages and public/private boundary', async ({ page }) => {
  await seedEntered(page);
  await page.goto('/projects/tradebot', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.tradebot-page')).toBeVisible();
  for (const id of ['tradebot-ingest', 'tradebot-research', 'tradebot-govern', 'tradebot-observe', 'tradebot-prove']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.locator('.public-private')).toContainText('PUBLIC');
  await expect(page.locator('.public-private')).toContainText('PRIVATE');
});

test('Contact uses a real mail surface rather than a non-functional form', async ({ page }) => {
  await seedEntered(page);
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.world-contact')).toBeVisible();
  const email = page.getByRole('link', { name: /contact@aixionlab.com/i });
  await expect(email).toHaveAttribute('href', 'mailto:contact@aixionlab.com');
  await expect(page.locator('form')).toHaveCount(0);
});

test('GitHub utility is visible and safely external', async ({ page }) => {
  await openHome(page);
  const github = page.getByRole('link', { name: 'GitHub — selected engineering work' });
  await expect(github).toBeVisible();
  await expect(github).toHaveAttribute('href', 'https://github.com/ramgolladi1503-sys');
  await expect(github).toHaveAttribute('target', '_blank');
  await expect(github).toHaveAttribute('rel', /noreferrer/);
});

test('mobile keeps all destinations reachable without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  await expect(page.locator('.hub-node')).toHaveCount(8);
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible();
  const size = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
  expect(size.scrollWidth).toBeLessThanOrEqual(size.innerWidth + 2);
});
