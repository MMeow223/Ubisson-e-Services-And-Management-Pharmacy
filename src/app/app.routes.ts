import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'page-login',
    loadComponent: () => import('./page-login/page-login.page').then( m => m.PageLoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'page-prescription-scan',
    loadComponent: () => import('./page-prescription-scan/page-prescription-scan.page').then( m => m.PagePrescriptionScanPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'page-prescription-details',
    loadComponent: () => import('./page-prescription-details/page-prescription-details.page').then( m => m.PagePrescriptionDetailsPage),
    canActivate: [AuthGuard],
  },
];
