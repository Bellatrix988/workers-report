import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

/*components*/
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { UpdateComponent } from './components/update/update.component';

/*pages*/
import { TabsNavigateComponent } from './pages/tabs-navigate/tabs-navigate.component';
import { ListUpdatesComponent } from './pages/list-updates/list-updates.component';

/*services*/
import { UpdatesDataService } from './services/updates-data.service';
import { CurrentUserService } from './services/current-user.service';
import { UsersService } from './services/users.service';
import { CurrentUserGuard } from './services/current-user.guard';


@NgModule({
  declarations: [
    AppComponent,
    ListUpdatesComponent,
    UpdateFormComponent,
    TabsNavigateComponent,
    UpdateComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UpdatesDataService, CurrentUserService, UsersService,
    CurrentUserGuard],
  bootstrap: [AppComponent]
})

export class AppModule {}
