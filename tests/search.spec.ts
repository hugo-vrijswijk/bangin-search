import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle("Bangin' Search");
});

test('redirects to default search engine', async ({ page }) => {
  await page.getByLabel('Search').fill('hello world');

  await page.getByRole('button', { name: 'Search' }).click();

  await expect.poll(() => page.url()).toBe('https://www.qwant.com/?q=hello+world');
});

test('supports bang search', async ({ page }) => {
  await page.getByLabel('Search').fill('!w hello world');

  await page.getByRole('button', { name: 'Search' }).click();

  expect(page.url()).toBe('https://en.wikipedia.org/wiki/Hello_world');
});

test('supports bangs in the middle of the query', async ({ page }) => {
  await page.getByLabel('Search').fill('hello !w world');

  await page.getByRole('button', { name: 'Search' }).click();

  expect(page.url()).toBe('https://en.wikipedia.org/wiki/Hello_world');
});

test('properly handles slashes', async ({ page }) => {
  await page.getByLabel('Search').fill('!ghr hugo-vrijswijk/bangin-search');

  await page.getByRole('button', { name: 'Search' }).click();

  expect(page.url()).toBe('https://github.com/hugo-vrijswijk/bangin-search');
});
