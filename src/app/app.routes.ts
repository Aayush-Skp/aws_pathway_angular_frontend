import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { UnknownRedirect } from './features/common-components/unknown-redirect/unknown-redirect';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./features/common-components/callback-page/callback-page').then(
        (m) => m.CallbackComponent
      ),
  },
  {
    path: '**',
    component: UnknownRedirect,
  },
];
