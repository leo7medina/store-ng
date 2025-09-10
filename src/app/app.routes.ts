import { Routes } from '@angular/router';
import {Layout} from '@shared/components/layout/layout';
import {NotFound} from '@info/pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () => import('@products/pages/list-products/list-products').then(c => c.ListProducts)
      },
      {
        path: 'about',
        loadComponent: () => import('@info/pages/about/about').then(c => c.About)
      },
      {
        path: 'product/:id',
        loadComponent: () => import('@products/pages/product-detail/product-detail').then(c => c.ProductDetail)
      },
    ]
  },
  {
    path: "**",
    component: NotFound
  }
];
