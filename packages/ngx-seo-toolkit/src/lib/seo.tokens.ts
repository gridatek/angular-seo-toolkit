import { InjectionToken } from '@angular/core';
import { SeoDefaultConfig } from './interfaces';

export const SEO_DEFAULT_CONFIG = new InjectionToken<SeoDefaultConfig>('SEO_DEFAULT_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    titleTemplate: '%s',
    defaultType: 'website',
    defaultLocale: 'en_US',
    defaultRobots: 'index,follow'
  })
});
