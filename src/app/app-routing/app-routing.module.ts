import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUpdatesComponent } from '../components/list-updates/list-updates.component';
import { FormCreateComponent } from '../components/form-create/form-create.component';
import { CurrentUserGuard } from './../services/current-user.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CurrentUserGuard],
    children: [
      { path: 'index',
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
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
