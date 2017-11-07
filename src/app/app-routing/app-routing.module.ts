import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUpdatesComponent } from '../components/list-updates/list-updates.component';
import { FormCreateComponent } from '../components/form-create/form-create.component';
import { CurrentUserGuard } from './../services/current-user.guard';
import { CanDeactivateGuardService } from './../services/create-form-deactivate.guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [CurrentUserGuard],
    children: [
      { path: 'index',
        // component: ListUpdatesComponent,
        children: [
          {
            path: '',
            component: ListUpdatesComponent
          },
          {
            path: ':id',
            component: ListUpdatesComponent
          }
        ]
      }
    ]
  }
      // { path: 'create', component: FormCreateComponent, canDeactivate: [CanDeactivateGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
