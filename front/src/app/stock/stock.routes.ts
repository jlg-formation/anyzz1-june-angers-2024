import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const stockRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: CreateComponent },
];

export default stockRoutes;
