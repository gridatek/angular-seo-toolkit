import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideStkSeoHelpers } from 'ngx-seo-toolkit';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
     provideStkSeoHelpers({
      siteName: 'My Awesome Website',
      titleTemplate: '%s | My Website',
      defaultAuthor: 'John Doe',
      defaultType: 'website',
      defaultLocale: 'en_US'
    })
  ],
};
