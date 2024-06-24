import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';
import { stockRoutes } from './stock/stock.routes';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'legal',
    loadComponent: () =>
      import('./routes/legal/legal.component').then((m) => m.LegalComponent),
  },
  { path: 'stock', children: stockRoutes },
];
