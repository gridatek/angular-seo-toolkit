import { Provider, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SeoDefaultConfig } from './seo.interfaces';
import { SEO_DEFAULT_CONFIG } from './seo.tokens';
import { StkSeo } from './seo.service';
import { StkMeta } from './meta.service';
import { StkStructuredData } from './structured-data.service';

export type StkSeoProvidersConfig = SeoDefaultConfig

export function provideStkConfig(config?: StkSeoProvidersConfig): EnvironmentProviders {
  const providers: Provider[] = [
    StkSeo,
    StkMeta,
    StkStructuredData
  ];

  if (config) {
    providers.push({
      provide: SEO_DEFAULT_CONFIG,
      useValue: config
    });
  }

  return makeEnvironmentProviders(providers);
}
