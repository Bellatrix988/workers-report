import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentUserGuard } from './services/current-user.guard';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [CurrentUserGuard],
    children: [
      { path: 'index',
        children: [
          {
            path: '',
            component: MainComponent
          },
          {
            path: ':id',
            component: MainComponent
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
