import { test, expect } from '@playwright/test';

test.describe('SEO Tests', () => {
  test('should have correct meta tags on home page', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Welcome Home/);

    // Check meta description
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('The best website for all your needs');

    // Check meta keywords
    const keywords = await page.getAttribute('meta[name="keywords"]', 'content');
    expect(keywords).toContain('home, welcome, awesome');

    // Check Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain(/Welcome Home/);

    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    expect(ogDescription).toContain('The best website for all your needs');

    const ogType = await page.getAttribute('meta[property="og:type"]', 'content');
    expect(ogType).toBe('website');

    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(ogImage).toContain('/assets/hero.jpg');

    // Check Twitter Card tags
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
    expect(twitterCard).toBe('summary');

    const twitterTitle = await page.getAttribute('meta[name="twitter:title"]', 'content');
    expect(twitterTitle).toContain(/Welcome Home/);
  });

  test('should have correct meta tags on product page', async ({ page }) => {
    await page.goto('/product');

    // Check title
    await expect(page).toHaveTitle(/Amazing Product - Buy Online/);

    // Check meta description
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('The best product ever made with cutting-edge technology');

    // Check meta keywords
    const keywords = await page.getAttribute('meta[name="keywords"]', 'content');
    expect(keywords).toContain('product, amazing, buy online, my brand');

    // Check Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain(/Amazing Product - Buy Online/);

    const ogType = await page.getAttribute('meta[property="og:type"]', 'content');
    expect(ogType).toBe('product');

    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(ogImage).toContain('/assets/product.jpg');
  });

  test('should have correct meta tags on about page', async ({ page }) => {
    await page.goto('/about');

    // Check title
    await expect(page).toHaveTitle(/About Us/);

    // Check meta description
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('Learn more about our company');

    // Check meta keywords
    const keywords = await page.getAttribute('meta[name="keywords"]', 'content');
    expect(keywords).toContain('about, company');
  });

  test('should have structured data on home page', async ({ page }) => {
    await page.goto('/');

    // Check for JSON-LD structured data
    const structuredDataScript = page.locator('script[type="application/ld+json"]');
    await expect(structuredDataScript).toHaveCount(1);

    // Get the structured data content
    const structuredData = await structuredDataScript.textContent();
    expect(structuredData).toBeTruthy();

    const jsonData = JSON.parse(structuredData!);

    // Verify website schema
    expect(jsonData['@context']).toBe('https://schema.org');
    expect(jsonData['@type']).toBe('WebSite');
    expect(jsonData.name).toBe('My Awesome Website');
    expect(jsonData.url).toBe('https://mywebsite.com');
    expect(jsonData.description).toBe('The best website for all your needs');
    expect(jsonData.potentialAction).toBeDefined();
    expect(jsonData.potentialAction['@type']).toBe('SearchAction');
  });

  test('should have structured data on product page', async ({ page }) => {
    await page.goto('/product');

    // Check for JSON-LD structured data
    const structuredDataScript = page.locator('script[type="application/ld+json"]');
    await expect(structuredDataScript).toHaveCount(1);

    // Get the structured data content
    const structuredData = await structuredDataScript.textContent();
    expect(structuredData).toBeTruthy();

    const jsonData = JSON.parse(structuredData!);

    // Verify product schema
    expect(jsonData['@context']).toBe('https://schema.org');
    expect(jsonData['@type']).toBe('Product');
    expect(jsonData.name).toBe('Amazing Product');
    expect(jsonData.description).toBe('The best product ever made with cutting-edge technology and premium quality materials.');
    expect(jsonData.image).toBe('/assets/product.jpg');
    expect(jsonData.sku).toBe('PROD-001');

    // Check offers
    expect(jsonData.offers).toBeDefined();
    expect(jsonData.offers['@type']).toBe('Offer');
    expect(jsonData.offers.price).toBe(99.99);
    expect(jsonData.offers.priceCurrency).toBe('USD');
    expect(jsonData.offers.availability).toBe('https://schema.org/InStock');

    // Check brand
    expect(jsonData.brand).toBeDefined();
    expect(jsonData.brand['@type']).toBe('Brand');
    expect(jsonData.brand.name).toBe('My Brand');
  });

  test('should have microdata markup on product page', async ({ page }) => {
    await page.goto('/product');

    // Check product microdata
    const productDiv = page.locator('[itemscope][itemtype="https://schema.org/Product"]');
    await expect(productDiv).toBeVisible();

    // Check product name
    const productName = page.locator('h1[itemprop="name"]');
    await expect(productName).toContainText('Amazing Product');

    // Check product image
    const productImage = page.locator('img[itemprop="image"]');
    await expect(productImage).toBeVisible();

    // Check offers microdata
    const offerDiv = page.locator('[itemscope][itemtype="https://schema.org/Offer"]');
    await expect(offerDiv).toBeVisible();

    // Check price
    const price = page.locator('[itemprop="price"]');
    await expect(price).toContainText('$99.99');

    // Check currency
    const currency = page.locator('[itemprop="priceCurrency"]');
    await expect(currency).toContainText('USD');

    // Check availability
    const availability = page.locator('[itemprop="availability"]');
    await expect(availability).toHaveAttribute('content', 'https://schema.org/InStock');

    // Check brand microdata
    const brandDiv = page.locator('[itemprop="brand"][itemscope][itemtype="https://schema.org/Brand"]');
    await expect(brandDiv).toBeVisible();

    const brandName = page.locator('[itemprop="brand"] [itemprop="name"]');
    await expect(brandName).toContainText('My Brand');
  });

  test('should have SEO image directive attributes', async ({ page }) => {
    await page.goto('/');

    const stkSeoImage = page.locator('img[stkSeoImage]');
    await expect(stkSeoImage).toBeVisible();
    await expect(stkSeoImage).toHaveAttribute('loading', 'eager');
    await expect(stkSeoImage).toHaveAttribute('fetchpriority', 'high');
    await expect(stkSeoImage).toHaveAttribute('alt');

    await page.goto('/product');

    const productSeoImage = page.locator('img[stkSeoImage]');
    await expect(productSeoImage).toBeVisible();
    await expect(productSeoImage).toHaveAttribute('loading', 'eager');
    await expect(productSeoImage).toHaveAttribute('fetchpriority', 'high');
    await expect(productSeoImage).toHaveAttribute('alt', 'Amazing Product');
  });

  test('should update meta tags when navigating between pages', async ({ page }) => {
    await page.goto('/');

    // Check initial home page title
    await expect(page).toHaveTitle(/Welcome Home/);

    // Navigate to about page
    await page.click('nav a[routerLink="/about"]');
    await expect(page).toHaveTitle(/About Us/);

    // Navigate to product page
    await page.click('nav a[routerLink="/product"]');
    await expect(page).toHaveTitle(/Amazing Product - Buy Online/);

    // Navigate back to home
    await page.click('nav a[routerLink="/"]');
    await expect(page).toHaveTitle(/Welcome Home/);
  });

  test('should have viewport meta tag', async ({ page }) => {
    await page.goto('/');

    const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
    expect(viewport).toBe('width=device-width, initial-scale=1');
  });

  test('should have robots meta tag', async ({ page }) => {
    await page.goto('/');

    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots).toBe('index,follow');
  });
});