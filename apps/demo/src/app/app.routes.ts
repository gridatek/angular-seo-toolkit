import { Route } from '@angular/router';
import { Home } from './home/home';
import { stkSeoGuard } from 'ngx-seo-toolkit';

export const appRoutes: Route[] = [

    {
        path: '',
        component: Home,
        canActivate: [stkSeoGuard],
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
        canActivate: [stkSeoGuard],
        data: {
            seo: {
                title: 'About Us',
                description: 'Learn more about our company',
                keywords: ['about', 'company']
            }
        }
    },
    {
        path: 'product',
        loadComponent: () => import('./product/product').then(c => c.ProductComponent),
        canActivate: [stkSeoGuard],
        data: {
            seo: {
                title: 'Amazing Product - Buy Online',
                description: 'The best product ever made with cutting-edge technology and premium quality materials.',
                keywords: ['product', 'amazing', 'buy online', 'premium quality']
            }
        }
    }

];
