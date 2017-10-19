import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListReportsComponent } from '../list-reports/list-reports.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index',  component: ListReportsComponent }
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
