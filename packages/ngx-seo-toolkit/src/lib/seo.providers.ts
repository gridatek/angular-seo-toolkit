import { Provider, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SeoDefaultConfig } from './seo.interfaces';
import { SEO_DEFAULT_CONFIG } from './seo.tokens';
import { SeoService } from './seo.service';
import { MetaService } from './meta.service';
import { StructuredDataService } from './structured-data.service';

export type SeoProvidersConfig = SeoDefaultConfig

export function provideSeoHelpers(config?: SeoProvidersConfig): EnvironmentProviders {
  const providers: Provider[] = [
    SeoService,
    MetaService,
    StructuredDataService
  ];

  if (config) {
    providers.push({
      provide: SEO_DEFAULT_CONFIG,
      useValue: config
    });
  }

  return makeEnvironmentProviders(providers);
}
