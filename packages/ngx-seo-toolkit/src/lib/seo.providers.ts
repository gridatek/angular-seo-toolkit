import { Provider, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SeoDefaultConfig } from '../interfaces/seo.interfaces';
import { SEO_DEFAULT_CONFIG } from '../tokens/seo.tokens';
import { SeoService } from '../services/seo.service';
import { MetaService } from '../services/meta.service';
import { StructuredDataService } from '../services/structured-data.service';

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
