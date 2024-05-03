import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const stockRoutes: Routes = [
  { path: '', component: ListComponent, title: 'Liste des articles' },
  { path: 'create', component: CreateComponent, title: "Ajout d'un article" },
];

export default stockRoutes;
