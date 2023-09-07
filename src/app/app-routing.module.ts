import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadChildren: async () => (await import('./domain/auth/auth.routes')).AUTH_ROUTES,
  },
  {
    path: 'sol',
    loadChildren: async () => (await import('./domain/sol/sol.routes')).SOL_ROUTES,
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
