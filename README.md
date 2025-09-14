# Angular SEO Toolkit

A comprehensive monorepo containing the **ngx-seo-toolkit** Angular library and demo application, showcasing modern SEO best practices for Angular 20+ applications.

## 📦 Packages

### 🛠️ [ngx-seo-toolkit](./packages/ngx-seo-toolkit/)

A production-ready Angular library for implementing advanced SEO features:

- **Meta Tag Management**: Automatic handling of title, description, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD schemas for rich snippets (Article, Product, Website, etc.)
- **Image Optimization**: Modern image directive with `fetchpriority` and lazy loading
- **SSR Support**: Optimized for Angular Universal server-side rendering
- **Standalone Architecture**: Modern Angular 20+ with tree-shakable providers

[📖 **View Package Documentation**](./packages/ngx-seo-toolkit/README.md)

### 🎯 [Demo Application](./apps/demo/)

A complete Angular application demonstrating all SEO toolkit features:

- **Home Page**: Website schema and hero image optimization
- **Product Page**: E-commerce schema with microdata markup
- **About Page**: Basic SEO implementation

Run the demo: `npx nx serve demo`

## 🚀 Quick Start

### Installation

```bash
npm install ngx-seo-toolkit
```

### Basic Setup

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideSeoHelpers } from 'ngx-seo-toolkit';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideSeoHelpers({
      siteName: 'My Website',
      titleTemplate: '%s | My Website'
    })
  ]
});
```

### Usage in Components

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from 'ngx-seo-toolkit';

@Component({...})
export class MyComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'My Page Title',
      description: 'My page description for SEO',
      keywords: ['angular', 'seo']
    });
  }
}
```

## 🧪 Testing

The project includes comprehensive testing with Playwright:

### Run Tests

```bash
# Install dependencies
npm install

# Run unit tests
npx nx test ngx-seo-toolkit

# Run E2E tests
npx nx e2e demo-e2e

# Run all tests
npx nx run-many -t test lint e2e
```

### Test Coverage

- ✅ **SEO Meta Tags**: Title, description, Open Graph, Twitter Cards validation
- ✅ **Structured Data**: JSON-LD schema verification
- ✅ **Image Optimization**: Modern loading attributes testing
- ✅ **Navigation**: Route-based SEO updates
- ✅ **SSR Compatibility**: Server-side rendering validation

## 🏗️ Development

This project uses Nx for monorepo management:

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/angular-seo-toolkit.git
cd angular-seo-toolkit

# Install dependencies
npm install

# Start development server
npx nx serve demo
```

### Available Commands

```bash
# Development
npx nx serve demo                 # Start demo app
npx nx build ngx-seo-toolkit     # Build library
npx nx build demo               # Build demo app

# Testing
npx nx test ngx-seo-toolkit     # Unit tests
npx nx e2e demo-e2e            # E2E tests
npx nx lint ngx-seo-toolkit    # Linting

# Release (see release guide)
npx nx release version --dry-run # Test release
npx nx release version          # Create version
npx nx release publish          # Publish to NPM
```

## 📋 Release Process

### Automated Releases

The project uses GitHub Actions for automated publishing:

1. **Push to main**: Triggers automatic release based on conventional commits
2. **Manual workflow**: Use GitHub Actions "Manual Release" workflow for controlled releases

### Local Releases

```bash
# Test release (dry run)
npx nx release version --dry-run

# Create and publish release
npx nx release version
npx nx release publish
```

### Conventional Commits

Use conventional commit format for automatic versioning:

```bash
# Patch version (bug fixes)
git commit -m "fix: resolve meta tag duplication"

# Minor version (new features)
git commit -m "feat: add breadcrumb schema support"

# Major version (breaking changes)
git commit -m "feat!: new standalone API"
```

## 🔧 Project Structure

```
angular-seo-toolkit/
├── apps/
│   ├── demo/                   # Demo application
│   └── demo-e2e/              # E2E tests
├── packages/
│   └── ngx-seo-toolkit/       # Main library
├── .github/
│   └── workflows/             # CI/CD workflows
├── RELEASE_SETUP.md           # Release setup guide
└── README.md                  # This file
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow conventional commits**: `git commit -m "feat: add amazing feature"`
4. **Run tests**: `npx nx run-many -t test lint e2e`
5. **Push changes**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- ✅ **Write tests** for all new features
- ✅ **Update documentation** as needed
- ✅ **Follow Angular style guide**
- ✅ **Use conventional commit format**
- ✅ **Ensure all CI checks pass**

## 📊 Package Stats

- **Bundle Size**: ~15KB gzipped (all features)
- **Angular Version**: 20+
- **Node.js**: 20+
- **Browser Support**: Modern browsers with graceful degradation

## 🔗 Links

- 📦 **NPM Package**: [ngx-seo-toolkit](https://www.npmjs.com/package/ngx-seo-toolkit)
- 📖 **Documentation**: [Package README](./packages/ngx-seo-toolkit/README.md)
- 🚀 **Release Setup**: [Release Guide](./RELEASE_SETUP.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-org/angular-seo-toolkit/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-org/angular-seo-toolkit/discussions)

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🎯 Roadmap

- [ ] Schema.org validation
- [ ] Performance monitoring integration
- [ ] Additional structured data schemas
- [ ] Sitemap automation
- [ ] Analytics integration

---

⭐ **If this project helped you, please consider giving it a star!** ⭐

Made with ❤️ for the Angular community