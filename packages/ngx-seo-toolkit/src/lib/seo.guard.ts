import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SeoService } from './seo.service';
import { SeoConfig } from './seo.interfaces';

export const seoGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const seoService = inject(SeoService);

  // Get SEO data from route data
  const seoData: SeoConfig = route.data['seo'];

  if (seoData) {
    // Update SEO with route-specific data
    seoService.updateSeo({
      ...seoData,
      url: state.url
    });
  }

  return true;
};
