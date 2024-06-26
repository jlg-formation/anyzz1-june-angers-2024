import { Routes } from '@angular/router';

const stockRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component'),
    title: 'Gestion Stock - Liste des articles',
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.component'),
    title: 'Gestion Stock - Ajoute un article',
  },
];

export default stockRoutes;
