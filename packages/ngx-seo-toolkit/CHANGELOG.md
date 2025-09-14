# Changelog

All notable changes to the ngx-seo-toolkit library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of ngx-seo-toolkit
- SeoService with comprehensive meta tag management
- StructuredDataService for JSON-LD schema creation
- MetaService for Open Graph and Twitter Cards
- SeoImageDirective for modern image optimization
- Functional seoGuard for route-based SEO
- Support for Angular 20+ with standalone architecture
- Full SSR (Server-Side Rendering) compatibility
- Modern Angular features: inject(), standalone components
- Comprehensive Playwright test suite
- Demo application showcasing all features

### Features
- **Meta Tag Management**: Automatic handling of title, description, keywords, Open Graph, and Twitter Cards
- **Structured Data**: Easy JSON-LD schema creation for Article, Product, Website, Organization, and Breadcrumb
- **Image Optimization**: SEO directive with fetchpriority, lazy loading, and performance hints
- **Route Guards**: Functional CanActivateFn for SEO data injection
- **Platform Awareness**: Different behavior for server vs browser environments
- **TypeScript Support**: Comprehensive type definitions and interfaces
- **Tree Shaking**: Optimized bundle size with standalone architecture

### Schemas Supported
- Article (blog posts, news articles)
- Product (e-commerce items with offers, reviews, brand)
- Website (with search action support)
- Organization (business information)
- Breadcrumb (navigation hierarchy)

### Performance Features
- Bundle size: ~15KB gzipped for all features
- Tree-shakable services and directives
- Lazy loading support
- Modern image loading with fetchpriority
- Platform-aware code execution

### Browser Support
- Modern browsers with fetchpriority support (Chrome 101+, Edge 101+)
- Graceful degradation for older browsers
- Full compatibility with Angular Universal SSR
- Mobile-optimized responsive handling

## [0.0.1] - 2024-01-XX

### Added
- Initial package setup and configuration
- Basic project structure with Nx workspace
- Development environment and tooling