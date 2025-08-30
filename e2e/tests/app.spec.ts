import { expect, test } from 'next/experimental/testmode/playwright/msw'

import handlers from '../handlers'

test.use({
  mswHandlers: [handlers, { scope: 'test' }],
})

test('render dataSets on the homepage', async ({ page }) => {
  // Visit the homepage
  await page.goto('/')

  // Expect subtitle on main page to render
  await expect(page.locator('text=data from data.gov')).toBeVisible()
  // Expect list of datasets to render, check title of second item
  await expect(page.locator('text=Lottery Powerball Winning Numbers: Beginning 2010')).toBeVisible()
})

test('render chart page with data', async ({ page }) => {
  // Visit the chart page
  await page.goto('/chart/lottery_powerball_winning_numbers?page=1&pageSize=100')
  // Expect chart page title to render
  await expect(
    page.locator('text=Winning numbers for the Powerball lottery game in New York'),
  ).toBeVisible()

  // Expect chart to render
  await expect(page.locator('text=Draw Date')).toBeVisible()
})
