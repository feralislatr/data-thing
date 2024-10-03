import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('renders dataSets on the homepage', async ({ page }) => {
    // Intercept API calls
    await page.route('**/catalog/*', async route => {
      const json = JSON.stringify(require('../cypress/fixtures/catalog.json'));
      await route.fulfill({ json });
    });

    // Visit the homepage
    await page.goto('/');

    // Expect subtitle on main page to render
    await expect(page.locator('text=Data from data.gov')).toBeVisible();
    // Expect list of datasets to render, check title of second item
    await expect(
      page.locator('text=Lottery Powerball Winning Numbers: Beginning 2010'),
    ).toBeVisible();
  });
});
