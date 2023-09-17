import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },  {
    path: 'page-prescription-scan',
    loadComponent: () => import('./page-prescription-scan/page-prescription-scan.page').then( m => m.PagePrescriptionScanPage)
  },

];
