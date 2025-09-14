import { Provider, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SeoDefaultConfig } from './seo.interfaces';
import { SEO_DEFAULT_CONFIG } from './seo.tokens';
import { StkSeoService } from './seo.service';
import { StkMetaService } from './meta.service';
import { StkStructuredDataService } from './structured-data.service';

export type StkSeoProvidersConfig = SeoDefaultConfig

export function provideStkConfig(config?: StkSeoProvidersConfig): EnvironmentProviders {
  const providers: Provider[] = [
    StkSeoService,
    StkMetaService,
    StkStructuredDataService
  ];

  if (config) {
    providers.push({
      provide: SEO_DEFAULT_CONFIG,
      useValue: config
    });
  }

  return makeEnvironmentProviders(providers);
}
