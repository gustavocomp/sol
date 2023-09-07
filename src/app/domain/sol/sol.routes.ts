import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { MainSolComponent } from './pages/main/main-sol.component';

export const SOL_ROUTES: Routes = [
  {
    path: '',
    component: MainSolComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: async () => (await import('./pages/dashboard/dashboard.component')).DashboardComponent,
        canActivateChild: [AuthGuard],
      },
      {
        path: 'admin',
        loadComponent: async () => (await import('./pages/admin/admin.component')).AdminComponent,
        canActivateChild: [AuthGuard],
      },
      {
        path: 'users',
        loadComponent: async () => (await import('./pages/users/users.component')).UsersComponent,
        canActivateChild: [AuthGuard],
      },
    ],
  },
];
