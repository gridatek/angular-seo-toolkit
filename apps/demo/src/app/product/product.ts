import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StkSeo, StkStructuredData, StkSeoImageDirective } from 'ngx-seo-toolkit';

@Component({
  selector: 'app-product',
  imports: [StkSeoImageDirective],
  template: `
    <div itemscope itemtype="https://schema.org/Product">
      <h1 itemprop="name">{{ product.name }}</h1>
      <img stkSeoImage
           [src]="product.image"
           [alt]="product.name"
           loading="eager"
           fetchpriority="high"
           itemprop="image">

      <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
        <span itemprop="price">\${{ product.price }}</span>
        <span itemprop="priceCurrency">{{ product.currency }}</span>
      </div>

      <div class="product-details">
        <p>{{ product.description }}</p>
        <div class="availability" itemprop="availability" content="https://schema.org/InStock">
          In Stock
        </div>
        <div class="brand" itemprop="brand" itemscope itemtype="https://schema.org/Brand">
          <span itemprop="name">{{ product.brand }}</span>
        </div>
      </div>
    </div>
  `,
  styles: `
    .product-details {
      margin-top: 20px;
    }

    .availability {
      color: green;
      font-weight: bold;
    }

    .brand {
      margin-top: 10px;
      font-style: italic;
    }

    img {
      max-width: 400px;
      height: auto;
    }

    h1 {
      color: #333;
    }

    .price {
      font-size: 1.5em;
      font-weight: bold;
      color: #e44d26;
    }
  `
})
export class ProductComponent implements OnInit {
  // Modern inject pattern
  private readonly seoService = inject(StkSeo);
  private readonly structuredDataService = inject(StkStructuredData);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly isBrowser = isPlatformBrowser(this.platformId);

  product = {
    name: 'Amazing Product',
    price: 99.99,
    currency: 'USD',
    image: '/assets/product.jpg',
    description: 'The best product ever made with cutting-edge technology and premium quality materials.',
    brand: 'My Brand',
    sku: 'PROD-001',
    availability: 'https://schema.org/InStock'
  };

  ngOnInit(): void {
    // SEO updates work on both server and browser
    this.seoService.updateSeo({
      title: `${this.product.name} - Buy Online`,
      description: this.product.description,
      image: this.product.image,
      type: 'product',
      keywords: ['product', 'amazing', 'buy online', this.product.brand.toLowerCase()]
    });

    // Structured data for rich snippets
    const productSchema = this.structuredDataService.createProductSchema({
      name: this.product.name,
      description: this.product.description,
      image: this.product.image,
      price: this.product.price,
      currency: this.product.currency,
      brand: this.product.brand,
      sku: this.product.sku,
      availability: this.product.availability
    });

    this.structuredDataService.addStructuredData(productSchema, 'product');

    // Browser-only operations
    if (this.isBrowser) {
      console.log('Product loaded on browser');
    }
  }
}