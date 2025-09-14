import { Injectable, inject, PLATFORM_ID, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StructuredDataSchema } from './seo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  addStructuredData(schema: StructuredDataSchema, id?: string): void {
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema, null, 2);

    if (id) {
      script.id = id;
      // Remove existing script with same ID
      this.removeStructuredData(id);
    }

    this.doc.head.appendChild(script);
  }

  removeStructuredData(id: string): void {
    const script = this.doc.getElementById(id);
    if (script) {
      script.remove();
    }
  }

  createArticleSchema(data: {
    headline: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    description?: string;
    url?: string;
  }): StructuredDataSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      author: {
        '@type': 'Person',
        name: data.author
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      ...(data.image && { image: data.image }),
      ...(data.description && { description: data.description }),
      ...(data.url && { url: data.url })
    };
  }

  createOrganizationSchema(data: {
    name: string;
    url: string;
    logo?: string;
    description?: string;
    address?: any;
    contactPoint?: any;
    sameAs?: string[];
  }): StructuredDataSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name,
      url: data.url,
      ...(data.logo && { logo: data.logo }),
      ...(data.description && { description: data.description }),
      ...(data.address && { address: data.address }),
      ...(data.contactPoint && { contactPoint: data.contactPoint }),
      ...(data.sameAs && { sameAs: data.sameAs })
    };
  }

  createBreadcrumbSchema(items: Array<{ name: string; url: string }>): StructuredDataSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  createProductSchema(data: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency: string;
    availability?: string;
    brand?: string;
    sku?: string;
    reviews?: any[];
  }): StructuredDataSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      image: data.image,
      offers: {
        '@type': 'Offer',
        price: data.price,
        priceCurrency: data.currency,
        availability: data.availability || 'https://schema.org/InStock'
      },
      ...(data.brand && { brand: { '@type': 'Brand', name: data.brand } }),
      ...(data.sku && { sku: data.sku }),
      ...(data.reviews && { review: data.reviews })
    };
  }

  createWebSiteSchema(data: {
    name: string;
    url: string;
    description?: string;
    searchAction?: {
      target: string;
      queryInput: string;
    };
  }): StructuredDataSchema {
    const schema: StructuredDataSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: data.name,
      url: data.url,
      ...(data.description && { description: data.description })
    };

    if (data.searchAction) {
      schema.potentialAction = {
        '@type': 'SearchAction',
        target: data.searchAction.target,
        'query-input': data.searchAction.queryInput
      };
    }

    return schema;
  }
}
