import { Route } from '@angular/router';
import { Home } from './home/home';
import { seoGuard } from 'ngx-seo-toolkit';

export const appRoutes: Route[] = [

    {
        path: '',
        component: Home,
        canActivate: [seoGuard],
        data: {
            seo: {
                title: 'Home',
                description: 'Welcome to our amazing website',
                keywords: ['home', 'welcome']
            }
        }
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about').then(c => c.About),
        canActivate: [seoGuard],
        data: {
            seo: {
                title: 'About Us',
                description: 'Learn more about our company',
                keywords: ['about', 'company']
            }
        }
    }

];
