import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle("Bangin' Search");
});

test('redirects to default search engine', async ({ page }) => {
  await testSearchAndAssert(page, 'hello world', 'https://www.qwant.com/?q=hello+world&t=web');
});

test('supports bang search', async ({ page }) => {
  await testSearchAndAssert(page, '!w hello world', 'https://en.wikipedia.org/wiki/Hello,_world');
});

test('supports bangs in the middle of the query', async ({ page }) => {
  await testSearchAndAssert(page, 'hello !w world', 'https://en.wikipedia.org/wiki/Hello,_world');
});

test('properly handles slashes', async ({ page }) => {
  await testSearchAndAssert(page, '!ghr hugo-vrijswijk/bangin-search', 'https://github.com/hugo-vrijswijk/bangin-search');
});

test('only ! results in default search', async ({ page }) => {
  await testSearchAndAssert(page, '! hello world', 'https://www.qwant.com/?q=%21+hello+world&t=web');
});

test('two !! results in default search', async ({ page }) => {
  await testSearchAndAssert(page, '!! hello world', 'https://www.qwant.com/?q=%21%21+hello+world&t=web');
});

test('only ! with no query results in default search', async ({ page }) => {
  await testSearchAndAssert(page, '!', 'https://www.qwant.com/?q=%21&t=web');
});

test('only bang with no query redirects to search engine', async ({ page }) => {
  await testSearchAndAssert(page, '!w', 'https://en.wikipedia.org/w/index.php?search=');
});

test('handles encoding properly', async ({ page }) => {
  await testSearchAndAssert(page, '&^%$#@!', 'https://www.qwant.com/?q=%26%5E%25%24%23%40%21&t=web');
});

async function testSearchAndAssert(page: Page, query: string, expectedUrl: string) {
  await page.getByLabel('Search').fill(query);
  await page.getByRole('button', { name: 'Search' }).click();
  await expect.poll(() => page.url()).toBe(expectedUrl);
}
