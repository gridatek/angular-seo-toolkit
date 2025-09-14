import { Provider, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SeoDefaultConfig } from './seo.interfaces';
import { SEO_DEFAULT_CONFIG } from './seo.tokens';
import { StkSeo } from './seo';
import { StkMeta } from './meta';
import { StkStructuredData } from './structured-data';

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
