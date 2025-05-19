const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'admin@Solutech.co.ke'); 
  await page.fill('input[type="password"]', 'Solutech123');       
  await page.click('button:has-text("LOG IN")');
  await expect(page.locator('text=Dashboard')).toBeVisible();  
});

test('Admin can create a new tour', async ({ page }) => {
  await page.click('text=Create Tour');
  await page.fill('input[name="destination"]', 'BALI');
  await page.fill('input[name="name"]', 'Mwanangu');
  await page.fill('input[name="slots"]', '2');
  await page.fill('input[name="price"]', '15000');
  await page.fill('textarea[name="description"]', 'An amazing evening by the beach.');

  await page.click('button:has-text("Submit")');
  await expect(page.locator('text=Tour created successfully')).toBeVisible();
});

test('Admin can view all bookings', async ({ page }) => {
  await page.click('text=All Bookings');
  await expect(page.locator('.booking-list')).toBeVisible(); 
});

test('Admin can view all tickets', async ({ page }) => {
  await page.click('text=All Tickets');
  await expect(page.locator('.ticket-list')).toBeVisible(); 
});
