import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DestroyRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { StkMeta } from './meta';
import { SeoConfig } from './interfaces';
import { SEO_DEFAULT_CONFIG } from './seo.tokens';
import { StkStructuredData } from './structured-data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class StkSeo {
  private readonly titleService = inject(Title);
  private readonly router = inject(Router);
  private readonly metaService = inject(StkMeta);
  private readonly structuredDataService = inject(StkStructuredData);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly defaultConfig = inject(SEO_DEFAULT_CONFIG);

  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly isServer = isPlatformServer(this.platformId);

  constructor() {
    this.initRouteListener();
  }

  updateSeo(config: Partial<SeoConfig>): void {
    const finalConfig = { ...this.defaultConfig, ...config };

    // Set title
    if (finalConfig.title) {
      this.setTitle(finalConfig.title);
    }

    // Set meta tags (works on both server and client)
    this.metaService.updateMetaTags(finalConfig);

    // Set canonical URL
    if (finalConfig.canonical) {
      this.setCanonicalUrl(finalConfig.canonical);
    } else if (this.isBrowser) {
      // Auto-set canonical URL based on current location
      this.setCanonicalUrl(window.location.href);
    }
  }

  setTitle(title: string, useTemplate = true): void {
    const template = this.defaultConfig.titleTemplate || '%s';
    const finalTitle = useTemplate ? template.replace('%s', title) : title;
    this.titleService.setTitle(finalTitle);
  }

  setCanonicalUrl(url: string): void {
    this.metaService.setCanonicalUrl(url);
  }

  generateSitemap(routes: string[], baseUrl?: string): string {
    const siteUrl = baseUrl || (this.isBrowser ? window.location.origin : '');
    const urls = routes.map(route =>
      `  <url>
    <loc>${siteUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
    ).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  private initRouteListener(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event: NavigationEnd) => {
        // Auto-update canonical URL on route changes (browser only)
        if (this.isBrowser) {
          const canonicalUrl = window.location.origin + event.url;
          this.setCanonicalUrl(canonicalUrl);
        }
      });
  }
}
