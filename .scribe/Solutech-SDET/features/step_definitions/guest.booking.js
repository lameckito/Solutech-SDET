const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser, context, page;

Given('I am logged in as guest', async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://sdet.solutechlabs.com/login');

});

When('I navigate to "book Tour"', async () => {
  await page.click('text=Book Tour'); 
});

When('I fill in all required tour details', async () => {
  await page.fill('text=Please enter the number of','3')
  await page.fill('text=please enter the ticket holder','lameckito');
  await page.fill('text=please enter your email address', 'Lameckito@gmail.com');
  await page.fill('input[name="price"]', '950');

  await page.click('button:has-text("Book Tour")'); 
});

Then('the tour should be created successfully', async () => {
  await page.waitForSelector('text=Booking made successfully');
});