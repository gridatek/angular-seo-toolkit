# ngx-seo-toolkit

A comprehensive Angular library (20+) that provides modern, standalone services, directives, and guards for implementing advanced SEO best practices. Built with the latest Angular features and optimized for Server-Side Rendering (SSR).

## 🚀 Features

✅ **Angular 20+ Ready** - Built with standalone components, modern `inject()` function, and latest Angular patterns
✅ **Full SSR Support** - Optimized for Angular Universal with platform-aware code execution
✅ **Standalone Architecture** - No NgModules required, fully tree-shakable providers
✅ **Comprehensive Meta Management** - Auto-handling of meta descriptions, Open Graph, Twitter Cards, and more
✅ **Rich Structured Data** - Easy JSON-LD schema creation for enhanced search snippets
✅ **Smart Canonical URLs** - Automatic canonical URL management with SSR detection
✅ **Modern Image Optimization** - SEO directive with `fetchpriority`, lazy loading, and performance hints
✅ **Functional Route Guards** - Modern `CanActivateFn` implementation for SEO data injection
✅ **XML Sitemap Generation** - Built-in sitemap creation utilities
✅ **Full TypeScript Support** - Comprehensive type definitions and interfaces
✅ **Cross-Platform** - Seamless operation on server and browser environments
✅ **Production Ready** - Battle-tested with comprehensive Playwright test suite

## 📋 Requirements

- Angular 20+
- TypeScript 5.9+
- Node.js 20+

## 📦 Installation

```bash
npm install ngx-seo-toolkit
```

## Quick Start

### 1. Bootstrap with Providers (main.ts)

Set up the SEO toolkit in your main application bootstrap:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStkConfig } from 'ngx-seo-toolkit';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStkConfig({
      siteName: 'My Awesome Website',
      titleTemplate: '%s | My Website',
      defaultAuthor: 'John Doe',
      defaultType: 'website',
      defaultLocale: 'en_US'
    })
  ]
});
```

### 2. Standalone Component Usage

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { StkSeo, StkSeoImage } from 'ngx-seo-toolkit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StkSeoImage],
  template: `
    <main>
      <h1>Welcome to My Website</h1>
      <img stkSeoImage 
           src="/assets/hero.jpg" 
           alt="Hero image"
           loading="eager"
           fetchpriority="high">
      <p>Amazing content here!</p>
    </main>
  `
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(StkSeo);

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Welcome Home',
      description: 'The best website for all your needs',
      keywords: ['home', 'welcome', 'awesome'],
      image: '/assets/hero.jpg'
    });
  }
}
```

## Modern Angular Features

### Functional Route Guards

```typescript
import { Routes } from '@angular/router';
import { stkSeoGuard } from 'ngx-seo-toolkit';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [stkSeoGuard],
    data: {
      seo: {
        title: 'Home',
        description: 'Welcome to our amazing website',
        keywords: ['home', 'welcome']
      }
    }
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./blog/blog-post.component').then(c => c.BlogPostComponent),
    canActivate: [stkSeoGuard],
    resolve: {
      post: BlogPostResolver
    }
  }
];
```

### Modern Inject Pattern

```typescript
import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StkSeo, StkStructuredData } from 'ngx-seo-toolkit';

@Component({
  selector: 'app-product',
  standalone: true,
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
    </div>
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
    description: 'The best product ever made'
  };

  ngOnInit(): void {
    // SEO updates work on both server and browser
    this.seoService.updateSeo({
      title: `${this.product.name} - Buy Online`,
      description: this.product.description,
      image: this.product.image,
      type: 'product'
    });

    // Structured data for rich snippets
    const productSchema = this.structuredDataService.createProductSchema({
      name: this.product.name,
      description: this.product.description,
      image: this.product.image,
      price: this.product.price,
      currency: this.product.currency,
      brand: 'My Brand'
    });

    this.structuredDataService.addStructuredData(productSchema, 'product');

    // Browser-only operations
    if (this.isBrowser) {
      console.log('Product loaded on browser');
    }
  }
}
```

## API Reference

### StkSeo

Modern service using the `inject()` pattern internally for better tree-shaking and performance.

#### Methods

##### `updateSeo(config: Partial<SeoConfig>): void`

Updates all SEO meta tags with the provided configuration. Works on both server and browser.

```typescript
this.seoService.updateSeo({
  title: 'Page Title',
  description: 'Page description for search engines',
  keywords: ['keyword1', 'keyword2'],
  image: '/assets/social-image.jpg',
  canonical: 'https://mysite.com/current-page'
});
```

##### `setTitle(title: string, useTemplate?: boolean): void`

Sets the page title with optional template usage.

```typescript
this.seoService.setTitle('Article Title'); // Uses template: "Article Title | My Website"
this.seoService.setTitle('Article Title', false); // No template: "Article Title"
```

##### `setCanonicalUrl(url: string): void`

Sets the canonical URL for the current page.

```typescript
this.seoService.setCanonicalUrl('https://mysite.com/canonical-page');
```

##### `generateSitemap(routes: string[], baseUrl?: string): string`

Generates an XML sitemap from an array of routes. SSR-friendly with optional baseUrl parameter.

```typescript
const sitemap = this.seoService.generateSitemap([
  '/',
  '/about',
  '/blog',
  '/contact'
], 'https://mywebsite.com');
```

### StkStructuredData

Service for managing JSON-LD structured data with modern schema creation helpers.

#### Methods

##### `addStructuredData(schema: StructuredDataSchema, id?: string): void`

Adds structured data to the page head. Works on both server and browser.

```typescript
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'My Article'
};

this.structuredDataService.addStructuredData(schema, 'article');
```

##### `createArticleSchema(data): StructuredDataSchema`

Creates Article schema with modern optional chaining for better performance.

```typescript
const schema = this.structuredDataService.createArticleSchema({
  headline: 'How to Use Angular SEO Helpers',
  author: 'Jane Smith',
  datePublished: '2024-01-15',
  dateModified: '2024-01-16',
  image: '/assets/article-image.jpg',
  description: 'A comprehensive guide to modern Angular SEO',
  url: 'https://myblog.com/angular-seo-guide'
});
```

##### `createProductSchema(data): StructuredDataSchema`

Creates Product schema for e-commerce SEO.

```typescript
const productSchema = this.structuredDataService.createProductSchema({
  name: 'Amazing Product',
  description: 'The best product ever',
  image: '/assets/product.jpg',
  price: 99.99,
  currency: 'USD',
  brand: 'My Brand',
  sku: 'PROD-001',
  availability: 'https://schema.org/InStock'
});
```

##### `createWebSiteSchema(data): StructuredDataSchema`

Creates WebSite schema with search action support.

```typescript
const websiteSchema = this.structuredDataService.createWebSiteSchema({
  name: 'My Website',
  url: 'https://mywebsite.com',
  description: 'The best website ever',
  searchAction: {
    target: 'https://mywebsite.com/search?q={search_term_string}',
    queryInput: 'required name=search_term_string'
  }
});
```

### Modern SEO Image Directive

Standalone directive with modern image optimization features.

```html
<!-- Basic usage -->
<img stkSeoImage 
     src="/assets/hero.jpg" 
     alt="Hero image">

<!-- Advanced usage with modern features -->
<img stkSeoImage 
     src="/assets/critical-image.jpg" 
     alt="Critical above-fold image"
     loading="eager"
     fetchpriority="high">

<!-- Lazy loading (default) -->
<img stkSeoImage 
     src="/assets/gallery-image.jpg" 
     alt="Gallery image"
     loading="lazy"
     fetchpriority="low">
```

**Directive Inputs:**
- `stkSeoImage`: Main directive selector
- `alt`: Alt text for accessibility and SEO
- `loading`: 'lazy' | 'eager' (defaults to 'lazy')
- `fetchpriority`: 'high' | 'low' | 'auto' (modern browsers only)

**Automatic Features:**
- Sets `decoding="async"` for better performance
- Adds `itemprop="image"` for structured data
- Browser-only error handling
- Platform-aware optimizations

### Functional Guard (stkSeoGuard)

Modern functional guard using `CanActivateFn`.

```typescript
import { Routes } from '@angular/router';
import { stkSeoGuard } from 'ngx-seo-toolkit';

export const routes: Routes = [
  {
    path: 'blog/:slug',
    loadComponent: () => import('./blog-post.component').then(c => c.BlogPostComponent),
    canActivate: [stkSeoGuard],
    resolve: {
      post: blogPostResolver
    },
    data: {
      seo: {
        title: 'Blog Post', // Will be overridden by resolver data
        type: 'article'
      }
    }
  }
];
```

## Provider Configuration

### provideStkConfig()

Modern environment providers for Angular 17+.

```typescript
// main.ts
import { provideStkConfig } from 'ngx-seo-toolkit';

bootstrapApplication(AppComponent, {
  providers: [
    // ... other providers
    provideStkConfig({
      siteName: 'My Website',
      titleTemplate: '%s | My Website', // %s will be replaced with page title
      defaultTitle: 'My Website',
      defaultDescription: 'The best website on the internet',
      defaultKeywords: ['website', 'awesome', 'angular'],
      defaultAuthor: 'John Doe',
      defaultImage: '/assets/default-social.jpg',
      defaultType: 'website',
      defaultLocale: 'en_US',
      defaultRobots: 'index,follow'
    })
  ]
});
```

## Advanced SSR Usage

### SSR-Optimized Blog Component

```typescript
import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StkSeo, StkStructuredData, StkSeoImage } from 'angular-seo-helpers';

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  tags: string[];
  slug: string;
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [StkSeoImage],
  template: `
    <article>
      <header>
        <h1>{{ post?.title }}</h1>
        <img stkSeoImage 
             [src]="post?.featuredImage" 
             [alt]="post?.title"
             loading="eager"
             fetchpriority="high">
        <div class="meta">
          <span>By {{ post?.author }}</span>
          <time [dateTime]="post?.publishedAt">{{ formatDate(post?.publishedAt) }}</time>
        </div>
      </header>
      
      <div class="content" [innerHTML]="post?.content"></div>
      
      <footer>
        <div class="tags">
          @for (tag of post?.tags; track tag) {
            <span class="tag">{{ tag }}</span>
          }
        </div>
      </footer>
    </article>
  `
})
export class BlogPostComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(StkSeo);
  private readonly structuredDataService = inject(StkStructuredData);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly isServer = isPlatformServer(this.platformId);

  post: BlogPost | null = null;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = data['post'];
      
      if (this.post) {
        this.setupSeo();
      }
    });
  }

  private setupSeo(): void {
    if (!this.post) return;

    // Generate canonical URL (platform-aware)
    const canonicalUrl = this.isBrowser 
      ? window.location.href 
      : `https://myblog.com/blog/${this.post.slug}`;

    // Update SEO meta tags (works on both server and browser)
    this.seoService.updateSeo({
      title: this.post.title,
      description: this.post.excerpt,
      keywords: this.post.tags,
      image: this.post.featuredImage,
      type: 'article',
      canonical: canonicalUrl
    });

    // Add Article structured data
    const articleSchema = this.structuredDataService.createArticleSchema({
      headline: this.post.title,
      author: this.post.author,
      datePublished: this.post.publishedAt,
      dateModified: this.post.updatedAt,
      image: this.post.featuredImage,
      description: this.post.excerpt,
      url: canonicalUrl
    });

    this.structuredDataService.addStructuredData(articleSchema, 'blog-post');

    // Add breadcrumb structured data
    const breadcrumbSchema = this.structuredDataService.createBreadcrumbSchema([
      { name: 'Home', url: 'https://myblog.com' },
      { name: 'Blog', url: 'https://myblog.com/blog' },
      { name: this.post.title, url: canonicalUrl }
    ]);

    this.structuredDataService.addStructuredData(breadcrumbSchema, 'breadcrumb');

    // Browser-only operations
    if (this.isBrowser) {
      // Analytics, user interactions, etc.
      console.log('Blog post loaded on browser');
    }

    // Server-only operations
    if (this.isServer) {
      // Server-specific SEO operations
      console.log('Blog post rendered on server');
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
```

### E-commerce Product with Modern Angular

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StkSeo, StkStructuredData, StkSeoImage } from 'angular-seo-helpers';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  brand: string;
  sku: string;
  category: string;
  inStock: boolean;
  reviews: Review[];
}

interface Review {
  rating: number;
  comment: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [StkSeoImage],
  template: `
    <div itemscope itemtype="https://schema.org/Product">
      <h1 itemprop="name">{{ product()?.name }}</h1>
      
      <div class="product-images">
        @for (image of product()?.images; track image; let first = $first) {
          <img stkSeoImage 
               [src]="image" 
               [alt]="product()?.name"
               [loading]="first ? 'eager' : 'lazy'"
               [fetchpriority]="first ? 'high' : 'auto'"
               itemprop="image">
        }
      </div>
      
      <div class="product-details">
        <p itemprop="description">{{ product()?.description }}</p>
        
        <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <span class="price">
            <span itemprop="price">{{ product()?.price }}</span>
            <span itemprop="priceCurrency">{{ product()?.currency }}</span>
          </span>
          
          <meta itemprop="availability" 
                [content]="product()?.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'">
          
          <span class="stock-status">
            {{ product()?.inStock ? 'In Stock' : 'Out of Stock' }}
          </span>
        </div>
        
        <div class="reviews">
          <h3>Reviews ({{ product()?.reviews.length }})</h3>
          @for (review of product()?.reviews; track review.date) {
            <div class="review" itemscope itemtype="https://schema.org/Review">
              <div itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                <span itemprop="ratingValue">{{ review.rating }}</span>/5
              </div>
              <p itemprop="reviewBody">{{ review.comment }}</p>
              <cite itemprop="author">{{ review.author }}</cite>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ProductComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(StkSeo);
  private readonly structuredDataService = inject(StkStructuredData);

  // Using Angular 17+ signals
  product = signal<Product | null>(null);

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const productData = data['product'] as Product;
      this.product.set(productData);
      
      if (productData) {
        this.setupProductSeo(productData);
      }
    });
  }

  private setupProductSeo(product: Product): void {
    // Update SEO meta tags
    this.seoService.updateSeo({
      title: `${product.name} - ${product.brand}`,
      description: product.description,
      keywords: [product.name, product.brand, product.category],
      image: product.images[0],
      type: 'product',
      canonical: `https://mystore.com/products/${product.id}`
    });

    // Create comprehensive product structured data
    const productSchema = this.structuredDataService.createProductSchema({
      name: product.name,
      description: product.description,
      image: product.images[0],
      price: product.price,
      currency: product.currency,
      brand: product.brand,
      sku: product.sku,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      reviews: product.reviews.map(review => ({
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5
        },
        reviewBody: review.comment,
        author: {
          '@type': 'Person',
          name: review.author
        },
        datePublished: review.date
      }))
    });

    this.structuredDataService.addStructuredData(productSchema, 'product');

    // Add breadcrumb navigation
    const breadcrumbSchema = this.structuredDataService.createBreadcrumbSchema([
      { name: 'Home', url: 'https://mystore.com' },
      { name: 'Products', url: 'https://mystore.com/products' },
      { name: product.category, url: `https://mystore.com/products/category/${product.category}` },
      { name: product.name, url: `https://mystore.com/products/${product.id}` }
    ]);

    this.structuredDataService.addStructuredData(breadcrumbSchema, 'product-breadcrumb');
  }
}
```

## Modern Resolver Pattern

```typescript
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export const blogPostResolver: ResolveFn<any> = (route, state) => {
  const http = inject(HttpClient);
  const slug = route.paramMap.get('slug');
  
  return http.get(`/api/blog/posts/${slug}`);
};

export const productResolver: ResolveFn<Product> = (route, state) => {
  const http = inject(HttpClient);
  const productId = route.paramMap.get('id');
  
  return http.get<Product>(`/api/products/${productId}`);
};
```

## Performance Optimizations

### Image Loading Strategies

```html
<!-- Hero images: Load immediately with high priority -->
<img stkSeoImage 
     src="/assets/hero.jpg" 
     alt="Hero image"
     loading="eager"
     fetchpriority="high">

<!-- Above-the-fold product images -->
<img stkSeoImage 
     src="/assets/product-main.jpg" 
     alt="Product image"
     loading="eager"
     fetchpriority="high">

<!-- Gallery images: Lazy load with low priority -->
<img stkSeoImage 
     src="/assets/gallery-image.jpg" 
     alt="Gallery image"
     loading="lazy"
     fetchpriority="low">

<!-- Default behavior: Lazy load -->
<img stkSeoImage 
     src="/assets/content-image.jpg" 
     alt="Content image">
```

### SSR Performance Tips

1. **Platform-Aware Code**: Use `isPlatformBrowser()` and `isPlatformServer()` to optimize for each environment
2. **Canonical URLs**: Set them appropriately for SSR vs browser
3. **Structured Data**: Generate it on the server for better SEO
4. **Meta Tags**: Ensure they're set during SSR for search engines

## Migration from NgModules

If you're migrating from a traditional NgModule-based Angular app:

### Before (NgModule)
```typescript
// app.module.ts
import { SeoHelpersModule } from 'angular-seo-helpers';

@NgModule({
  imports: [SeoHelpersModule],
  // ...
})
export class AppModule {}
```

### After (Standalone)
```typescript
// main.ts
import { provideStkConfig } from 'ngx-seo-toolkit';

bootstrapApplication(AppComponent, {
  providers: [
    provideStkConfig({
      siteName: 'My Website'
    })
  ]
});
```

## 🧪 Testing

The ngx-seo-toolkit comes with comprehensive test coverage and examples.

### Demo Application

This repository includes a complete demo application showcasing all features:

- **Home Page**: Website schema, hero images with SEO optimization
- **About Page**: Basic SEO setup and meta tag management
- **Product Page**: E-commerce schema, microdata, and advanced SEO features

To run the demo:

```bash
npm install
npx nx serve demo
```

Visit `http://localhost:4200` to see the SEO toolkit in action.

### Playwright E2E Tests

The project includes comprehensive Playwright tests covering:

- **SEO Meta Tags**: Title, description, keywords, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD validation for all schema types
- **Image Optimization**: SEO directive attributes and performance hints
- **Navigation**: Route-based SEO updates and guard functionality
- **Microdata**: Product markup and rich snippet validation

Run the tests:

```bash
npx nx e2e demo-e2e
```

### Unit Testing SEO Service

```typescript
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStkConfig, StkSeo } from 'ngx-seo-toolkit';

describe('StkSeo', () => {
  let service: StkSeo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideStkConfig({
          siteName: 'Test Site',
          titleTemplate: '%s | Test'
        })
      ]
    });
    service = TestBed.inject(StkSeo);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should update SEO with title template', () => {
    service.updateSeo({ title: 'Test Page' });
    expect(document.title).toBe('Test Page | Test');
  });
});
```

## Best Practices for Modern Angular

1. **Use Signals**: For reactive data that affects SEO
2. **Platform Awareness**: Always check platform before browser-specific operations
3. **Lazy Loading**: Use route-level code splitting with SEO data
4. **Control Flow**: Use modern `@if`, `@for` syntax in templates
5. **Functional Guards**: Prefer `CanActivateFn` over class-based guards
6. **Inject Function**: Use `inject()` in functional contexts
7. **Environment Providers**: Use `provideStkConfig()` for better tree-shaking

## 🏗️ Architecture & Design Principles

### Modern Angular Patterns

This library is built using the latest Angular best practices:

- **Standalone Components**: No NgModules required, reducing bundle size
- **Functional Guards**: Using `CanActivateFn` instead of class-based guards
- **Inject Function**: Modern dependency injection with better tree-shaking
- **Environment Providers**: Optimized provider configuration
- **Control Flow Syntax**: Support for `@if`, `@for` in templates

### Performance Optimizations

1. **Tree Shaking**: Only import what you use
2. **Lazy Loading**: Services are injected only when needed
3. **Platform Awareness**: Different behavior for server vs browser
4. **Image Loading**: Smart `fetchpriority` and lazy loading strategies
5. **Bundle Optimization**: Minimal runtime overhead

### SEO Best Practices Built-In

- **Core Web Vitals**: Image optimization for better LCP scores
- **Structured Data**: Rich snippets for better search visibility
- **Meta Tag Management**: Complete social media sharing optimization
- **Canonical URLs**: Proper URL normalization for SEO
- **SSR Optimization**: Server-side rendering for search engines

## 🌐 Browser Support

- **Modern Features**: `fetchpriority` supported in Chromium-based browsers (Chrome 101+, Edge 101+)
- **Graceful Degradation**: Automatic fallbacks for older browsers
- **SSR Compatible**: All features work seamlessly with Angular Universal
- **Mobile Optimized**: Responsive image loading and meta viewport handling

## 📁 Package Structure

```
ngx-seo-toolkit/
├── src/
│   ├── lib/
│   │   ├── seo.service.ts           # Main SEO service
│   │   ├── meta.service.ts          # Meta tag management
│   │   ├── structured-data.service.ts # JSON-LD schemas
│   │   ├── seo-image.directive.ts   # Image optimization directive
│   │   ├── seo.guard.ts            # Functional route guard
│   │   ├── seo.providers.ts        # Environment providers
│   │   ├── seo.interfaces.ts       # TypeScript interfaces
│   │   └── seo.tokens.ts           # Injection tokens
│   └── index.ts                    # Public API
├── README.md                       # This file
├── package.json                    # Package configuration
└── ng-package.json                # Angular package config
```

## 📊 Bundle Size

The library is designed to be lightweight and tree-shakable:

- **Core Services**: ~8KB gzipped
- **Image Directive**: ~2KB gzipped
- **Guards**: ~1KB gzipped
- **Structured Data**: ~4KB gzipped

Total impact when using all features: **~15KB gzipped**

## 🚀 Roadmap

- [ ] **Schema.org Validation**: Built-in validation for structured data
- [ ] **Performance Monitoring**: Core Web Vitals integration
- [ ] **Analytics Integration**: SEO event tracking
- [ ] **Sitemap Automation**: Dynamic sitemap generation
- [ ] **Meta Tag Templates**: Predefined templates for different page types
- [ ] **A11y Integration**: Accessibility-aware SEO optimizations

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Run tests**: `npx nx test ngx-seo-toolkit`
4. **Run E2E tests**: `npx nx e2e demo-e2e`
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/angular-seo-toolkit.git

# Install dependencies
npm install

# Start development server
npx nx serve demo

# Run tests
npx nx test ngx-seo-toolkit
npx nx e2e demo-e2e

# Build the library
npx nx build ngx-seo-toolkit
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-org/angular-seo-toolkit/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/your-org/angular-seo-toolkit/issues/new?template=feature_request.md)
- 📖 **Documentation**: [GitHub Wiki](https://github.com/your-org/angular-seo-toolkit/wiki)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-org/angular-seo-toolkit/discussions)
- 🔗 **Stack Overflow**: Tag with `ngx-seo-toolkit`

---

⭐ **If this library helped you, please consider giving it a star!** ⭐