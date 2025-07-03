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

test('only ! results in default search', async ({ page }) => {
  await page.getByLabel('Search').fill('! hello world');

  await page.getByRole('button', { name: 'Search' }).click();

  expect(page.url()).toBe('https://www.qwant.com/?q=%21+hello+world');
});

test('two !! results in default search', async ({ page }) => {
  await page.getByLabel('Search').fill('!! hello world');

  await page.getByRole('button', { name: 'Search' }).click();

  expect(page.url()).toBe('https://www.qwant.com/?q=%21%21+hello+world');
});

test('only ! with no query results in default search', async ({ page }) => {
  await page.getByLabel('Search').fill('!');

  await page.getByRole('button', { name: 'Search' }).click();

  expect(page.url()).toBe('https://www.qwant.com/?q=%21');
});

test('only bang with no query redirects to search engine', async ({ page }) => {
  await page.getByLabel('Search').fill('!w');

  await page.getByRole('button', { name: 'Search' }).click();

  expect(page.url()).toBe('https://en.wikipedia.org/w/index.php?search=');
});
