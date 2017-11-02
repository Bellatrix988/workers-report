import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListUpdatesComponent } from '../components/list-updates/list-updates.component';
import { FormCreateComponent } from '../components/form-create/form-create.component';
import { UpdatesListCurrentUserComponent } from './../components/updates-list-currentuser/updates-list-currentuser.component';

import { CanDeactivateGuardService } from './../services/create-form-deactivate.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: ListUpdatesComponent },
  { path: 'my', component: UpdatesListCurrentUserComponent },
  { path: 'create', component: FormCreateComponent, canDeactivate: [CanDeactivateGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
