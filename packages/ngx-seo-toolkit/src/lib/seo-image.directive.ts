import { Directive, ElementRef, Input, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[seoImage]',
  standalone: true
})
export class SeoImageDirective implements OnInit {
  @Input() seoImage = '';
  @Input() alt = '';
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() fetchpriority: 'high' | 'low' | 'auto' = 'auto';

  private readonly el = inject<ElementRef<HTMLImageElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    const img = this.el.nativeElement;

    // Set alt attribute for SEO and accessibility
    if (this.alt) {
      img.alt = this.alt;
    }

    // Set loading attribute
    img.loading = this.loading;

    // Set fetch priority (modern browsers)
    if (this.fetchpriority !== 'auto') {
      img.setAttribute('fetchpriority', this.fetchpriority);
    }

    // Set structured data attributes
    img.setAttribute('itemprop', 'image');

    // Add error handling (browser only)
    if (this.isBrowser) {
      img.onerror = () => {
        console.warn(`Failed to load image: ${img.src}`);
      };
    }

    // Add modern image attributes for better performance
    img.decoding = 'async';
  }
}
