import { Component, inject, OnInit } from '@angular/core';
import { SeoImageDirective, SeoService, StructuredDataService } from 'ngx-seo-toolkit';

@Component({
  selector: 'app-home',
  imports: [SeoImageDirective],
  template: `
 <main>
      <h1>Welcome to My Website</h1>
      <img seoImage 
           src="/assets/hero.jpg" 
           alt="Hero image showing our amazing product"
           loading="eager"
           fetchpriority="high">
      <p>This is the best website ever!</p>
    </main>
  `,
  styles: ``
})
export class Home implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly structuredDataService = inject(StructuredDataService);

  ngOnInit(): void {
    // Update SEO
    this.seoService.updateSeo({
      title: 'Welcome Home',
      description: 'The best website for all your needs',
      keywords: ['home', 'welcome', 'awesome'],
      image: '/assets/hero.jpg',
      type: 'website'
    });

    // Add website structured data
    const websiteSchema = this.structuredDataService.createWebSiteSchema({
      name: 'My Awesome Website',
      url: 'https://mywebsite.com',
      description: 'The best website for all your needs',
      searchAction: {
        target: 'https://mywebsite.com/search?q={search_term_string}',
        queryInput: 'required name=search_term_string'
      }
    });

    this.structuredDataService.addStructuredData(websiteSchema, 'website');
  }
}