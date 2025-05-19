const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser, context, page;

Given('I am on the homepage', async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://sdet.solutechlabs.com/');
});

When('I select a tour and book it', async () => {
  await page.click('text=Book Tour'); 
});

Then('I should see the ticket page', async () => {
  await page.waitForSelector('text=Ticket');
  await browser.close();
});

Given('I am logged in as admin', async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://sdet.solutechlabs.com/login');
  await page.fill('input[type="email"]', 'admin@solutech.co.ke'); 
  await page.fill('input[type="password"]', 'admin123'); 
  await page.click('button:has-text("LOG IN")');
  await page.waitForSelector('text=Dashboard'); 
});

When('I navigate to "Create Tour"', async () => {
  await page.click('text=Create Tour');
});

When('I fill in all required tour details', async () => {
  await page.fill('input[name="destination"]', 'BALI');
  await page.fill('input[name="name"]', 'lameckito');
  await page.fill('input[name="slots"]', '2');
  await page.fill('input[name="price"]', '3000');
  await page.fill('textarea[name="description"]', 'Enjoying the beach.');
  await page.click('button:has-text("Submit")');
});

Then('the tour should be created successfully', async () => {
  await page.waitForSelector('text=Tour created successfully');
});

When('I go to "All Bookings"', async () => {
  await page.click('text=All Bookings'); 
});

Then('I should see a list of bookings', async () => {
  await page.waitForSelector('.booking-list'); 
});

When('I go to "All Tickets"', async () => {
  await page.click('text=All Tickets'); 
});

Then('I should see all generated tickets', async () => {
  await page.waitForSelector('.ticket-list'); 
  await browser.close();
});
