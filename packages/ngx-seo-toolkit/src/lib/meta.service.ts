import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { OpenGraphData, SeoConfig, TwitterCardData } from './seo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  updateMetaTags(config: SeoConfig): void {
    // Basic meta tags
    this.setTag('description', config.description);
    this.setTag('keywords', config.keywords?.join(', '));
    this.setTag('author', config.author);
    this.setTag('robots', config.robots || 'index,follow');

    // Viewport meta tag (important for mobile SEO)
    this.setTag('viewport', 'width=device-width, initial-scale=1');

    // Open Graph tags
    this.setOpenGraphTags({
      title: config.title,
      description: config.description,
      image: config.image,
      url: config.url,
      type: config.type,
      siteName: config.siteName,
      locale: config.locale
    });

    // Twitter Card tags
    this.setTwitterCardTags({
      title: config.title,
      description: config.description,
      image: config.image
    });
  }

  setTag(name: string, content?: string): void {
    if (!content) return;

    const existingTag = this.meta.getTag(`name="${name}"`);
    if (existingTag) {
      this.meta.updateTag({ name, content });
    } else {
      this.meta.addTag({ name, content });
    }
  }

  setOpenGraphTags(data: OpenGraphData): void {
    const tags = [
      { property: 'og:title', content: data.title },
      { property: 'og:description', content: data.description },
      { property: 'og:image', content: data.image },
      { property: 'og:url', content: data.url },
      { property: 'og:type', content: data.type },
      { property: 'og:site_name', content: data.siteName },
      { property: 'og:locale', content: data.locale }
    ];

    tags.forEach(tag => {
      if (tag.content) {
        const existingTag = this.meta.getTag(`property="${tag.property}"`);
        if (existingTag) {
          this.meta.updateTag(tag);
        } else {
          this.meta.addTag(tag);
        }
      }
    });
  }

  setTwitterCardTags(data: TwitterCardData): void {
    const tags = [
      { name: 'twitter:card', content: data.card || 'summary' },
      { name: 'twitter:title', content: data.title },
      { name: 'twitter:description', content: data.description },
      { name: 'twitter:image', content: data.image },
      { name: 'twitter:site', content: data.site },
      { name: 'twitter:creator', content: data.creator }
    ];

    tags.forEach(tag => {
      if (tag.content) {
        const existingTag = this.meta.getTag(`name="${tag.name}"`);
        if (existingTag) {
          this.meta.updateTag(tag);
        } else {
          this.meta.addTag(tag);
        }
      }
    });
  }

  setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');

    if (link) {
      link.setAttribute('href', url);
    } else {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.doc.head.appendChild(link);
    }
  }

  removeTag(selector: string): void {
    if (this.isBrowser) {
      const element = this.doc.querySelector(selector);
      if (element) {
        element.remove();
      }
    }
  }
}
