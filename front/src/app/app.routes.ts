import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import * as eee from './routes/legal/legal.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'legal',
    loadComponent: () => import('./routes/legal/legal.component'),
  },
  {
    path: 'stock',
    loadChildren: () => import('./stock/stock.routes'),
  },
];
