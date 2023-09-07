import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    loadComponent: async () => (await import('./pages/sign-in/sign-in.component')).SignInComponent,
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
