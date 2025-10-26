import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/home');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Eko Front/);
});
