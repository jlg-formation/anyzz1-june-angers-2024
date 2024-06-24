import { Routes } from '@angular/router';

const stockRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.component'),
  },
];

export default stockRoutes;
