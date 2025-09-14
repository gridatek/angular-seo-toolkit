import { test, expect } from '@playwright/test';

test.describe('Basic App Tests', () => {
  test('should load and have correct title', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Welcome Home/);

    // Check h1 content
    await expect(page.locator('h1')).toContainText('Welcome to My Website');
  });

  test('should have all navigation links working', async ({ page }) => {
    await page.goto('/');

    // Check all navigation links exist
    await expect(page.locator('nav a[routerLink="/"]')).toBeVisible();
    await expect(page.locator('nav a[routerLink="/about"]')).toBeVisible();
    await expect(page.locator('nav a[routerLink="/product"]')).toBeVisible();
  });

  test('should display product information correctly', async ({ page }) => {
    await page.goto('/product');

    // Check product details
    await expect(page.locator('h1')).toContainText('Amazing Product');
    await expect(page.locator('[itemprop="price"]')).toContainText('$99.99');
    await expect(page.locator('[itemprop="priceCurrency"]')).toContainText('USD');
    await expect(page.locator('.availability')).toContainText('In Stock');
    await expect(page.locator('.brand [itemprop="name"]')).toContainText('My Brand');
  });
});
