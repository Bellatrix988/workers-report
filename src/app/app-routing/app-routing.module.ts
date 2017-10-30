import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListUpdatesComponent } from '../components/list-updates/list-updates.component';
import { FormCreateComponent } from '../components/form-create/form-create.component';
import { CanDeactivateGuardService } from '../services/can-deactivate-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: ListUpdatesComponent },
  { path: 'create', component: FormCreateComponent, canDeactivate: [CanDeactivateGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
