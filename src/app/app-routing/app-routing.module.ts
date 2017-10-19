import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListReportsComponent } from '../list-reports/list-reports.component';
import { FormCreateComponent } from '../form-create/form-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index',  component: ListReportsComponent },
  { path: 'create',     component: FormCreateComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
