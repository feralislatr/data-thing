import { test, expect } from 'next/experimental/testmode/playwright';
import data from '../data/catalog.json';

test.describe('Home', () => {
  test('renders dataSets on the homepage', async ({ page, next }) => {
    // Intercept API call
    const json = JSON.stringify(data);
    next.onFetch(request => {
      if (request.url.match(/catalog.data.gov/)) {
        return new Response(json, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      return 'abort';
    });

    // Visit the homepage
    await page.goto('/');

    // Expect subtitle on main page to render
    await expect(page.locator('text=data from data.gov')).toBeVisible();
    // Expect list of datasets to render, check title of second item
    await expect(
      page.locator('text=Lottery Powerball Winning Numbers: Beginning 2010'),
    ).toBeVisible();
  });
});
