import { test, expect } from '@playwright/test';

test('motion configuration preserves content and controls', async ({page}) => {
  const disabled = process.env.AIXION_EXPECT_MOTION_DISABLED === 'true';
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', disabled ? 'disabled' : 'enabled');
  if (disabled) {
    await expect(page.locator('.arrival')).toHaveAttribute('data-phase','done');
    await expect(page.locator('.page-transition')).toHaveCSS('animation-name','none');
    await expect(page.locator('.hero-art .material')).toHaveCSS('transform','none');
  }
  await expect(page.getByRole('link',{name:'Explore My Work',exact:true})).toBeVisible();
});
