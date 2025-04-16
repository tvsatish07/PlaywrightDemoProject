// @ts-check
const { test, expect } = require('@playwright/test');
import {ai} from "@zerostep/playwright";

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('@zeroStep zero step playwright execution', async({page}) => {
  const aiArgs = {page, test}
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  const header = await ai("Get the header text",aiArgs);
  console.log(header);
})

test('@sauceDemo can login and logout', async ({ page }) => {
  const aiArgs = {page, test}
  await page.goto('https://www.saucedemo.com/')
  // @ts-ignore
  const [username, password] = await ai([
    'Get the first accepted username',
    'Get the accepted password',
  ], aiArgs)
  // @ts-ignore
  await ai([
    `Enter ${username} as the username`,
    `Enter ${password} as the password`
  ], aiArgs)
  // @ts-ignore
  await ai('Click Login', aiArgs)
  // @ts-ignore
  await ai('Click the menu button', aiArgs)
  // @ts-ignore
  await ai('Click the logout link', aiArgs)
})
