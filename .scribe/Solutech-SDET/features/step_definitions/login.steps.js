const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser, page;

Given('I am on the login page', async () => {
  browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://sdet.solutechlabs.com/login');
});

When('I enter invalid email and password', async () => {
  await page.fill('input[type="email"]', 'lameckito@gmail.com');
  await page.fill('input[type="password"]', 'wrongpassword');
  await page.click('button:has-text("LOG IN")');
});

Then('I should see an error message {string}', async (message) => {
  await page.waitForSelector(`text=${'These credentials do not match our records.'}`);
  await browser.close();
});