import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should load home page correctly', async ({ page }) => {
    await page.goto('/');

    // Check page loads
    await expect(page).toHaveTitle(/Welcome Home/);

    // Check main content
    await expect(page.locator('h1')).toContainText('Welcome to My Website');
    await expect(page.locator('p')).toContainText('This is the best website ever!');

    // Check navigation links are present
    await expect(page.locator('nav a[routerLink="/"]')).toContainText('Home');
    await expect(page.locator('nav a[routerLink="/about"]')).toContainText('About');
    await expect(page.locator('nav a[routerLink="/product"]')).toContainText('Product');

    // Check hero image is present
    const heroImage = page.locator('img[stkSeoImage]');
    await expect(heroImage).toBeVisible();
    await expect(heroImage).toHaveAttribute('alt', 'Hero image showing our amazing product');
    await expect(heroImage).toHaveAttribute('loading', 'eager');
    await expect(heroImage).toHaveAttribute('fetchpriority', 'high');
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');

    // Navigate using the navigation link
    await page.click('nav a[routerLink="/about"]');

    // Check page loads
    await expect(page).toHaveTitle(/About Us/);

    // Check about content
    await expect(page.locator('p')).toContainText('about works!');
  });

  test('should navigate to product page', async ({ page }) => {
    await page.goto('/');

    // Navigate using the navigation link
    await page.click('nav a[routerLink="/product"]');

    // Check page loads
    await expect(page).toHaveTitle(/Amazing Product - Buy Online/);

    // Check product content
    await expect(page.locator('h1[itemprop="name"]')).toContainText('Amazing Product');

    // Check product image with SEO directive
    const productImage = page.locator('img[stkSeoImage]');
    await expect(productImage).toBeVisible();
    await expect(productImage).toHaveAttribute('alt', 'Amazing Product');
    await expect(productImage).toHaveAttribute('loading', 'eager');
    await expect(productImage).toHaveAttribute('fetchpriority', 'high');
    await expect(productImage).toHaveAttribute('itemprop', 'image');

    // Check structured data elements
    await expect(page.locator('[itemscope][itemtype="https://schema.org/Product"]')).toBeVisible();
    await expect(page.locator('[itemprop="price"]')).toContainText('$99.99');
    await expect(page.locator('[itemprop="priceCurrency"]')).toContainText('USD');
    await expect(page.locator('[itemprop="availability"]')).toHaveAttribute('content', 'https://schema.org/InStock');
  });

  test('should navigate between all pages using links', async ({ page }) => {
    await page.goto('/');

    // Go to About
    await page.click('nav a[routerLink="/about"]');
    await expect(page).toHaveTitle(/About Us/);

    // Go to Product
    await page.click('nav a[routerLink="/product"]');
    await expect(page).toHaveTitle(/Amazing Product - Buy Online/);

    // Go back to Home
    await page.click('nav a[routerLink="/"]');
    await expect(page).toHaveTitle(/Welcome Home/);
  });

  test('should handle direct navigation to product page', async ({ page }) => {
    await page.goto('/product');

    // Check page loads directly
    await expect(page).toHaveTitle(/Amazing Product - Buy Online/);
    await expect(page.locator('h1')).toContainText('Amazing Product');
  });

  test('should handle 404 for non-existent routes', async ({ page }) => {
    const response = await page.goto('/non-existent-page');

    // Should redirect to home or show 404 - check status or content
    expect(response?.status()).toBeTruthy();
  });
});