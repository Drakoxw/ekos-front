import { Routes } from '@angular/router';
import { PATH } from '@constants/index';

export const routes: Routes = [{
  path: '',
  children: [
    {
      path: PATH.HOME,
      loadChildren: () => import('@home-module/home-routing.module'),
    },
    {
      path: PATH.PRODUCTS,
      loadChildren: () => import('@products-module/products-routing.module'),
    },
    {
      path: PATH.ME,
      loadChildren: () => import('@me-module/me-routing.module'),
    },
    { path: '**', redirectTo: PATH.HOME, pathMatch: 'full' },
    { path: '', redirectTo: PATH.HOME, pathMatch: 'full' },
  ],
},];
