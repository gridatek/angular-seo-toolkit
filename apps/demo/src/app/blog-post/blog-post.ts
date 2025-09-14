import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, StructuredDataService } from 'ngx-seo-toolkit';

interface BlogPostData {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  featuredImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-blog-post',
  imports: [],
  template: `
  <article>
      <h1>{{ post?.title }}</h1>
      <div [innerHTML]="post?.content"></div>
    </article>
  `,
  styles: ``
})
export class BlogPost implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly structuredDataService = inject(StructuredDataService);
  private readonly platformId = inject(PLATFORM_ID);

  post: BlogPostData | null = null;

  ngOnInit(): void {
    // This works on both server and client
    this.route.data.subscribe(data => {
      this.post = data['post'];

      if (this.post) {
        // Update SEO (works on SSR)
        this.seoService.updateSeo({
          title: this.post.title,
          description: this.post.excerpt,
          keywords: this.post.tags,
          image: this.post.featuredImage,
          type: 'article'
        });

        // Add structured data (works on SSR)
        const articleSchema = this.structuredDataService.createArticleSchema({
          headline: this.post.title,
          author: this.post.author,
          datePublished: this.post.publishedAt,
          dateModified: this.post.updatedAt,
          image: this.post.featuredImage,
          description: this.post.excerpt,
          url: isPlatformBrowser(this.platformId) ? window.location.href : undefined
        });

        this.structuredDataService.addStructuredData(articleSchema, 'blog-post');
      }
    });
  }
}