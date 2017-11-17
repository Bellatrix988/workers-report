import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/*components*/
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { UpdateComponent } from './components/update/update.component';
// import { TimeLineComponent } from './components/time-line/time-line.component';

/*pages*/
import { TabsNavigateComponent } from './pages/tabs-navigate/tabs-navigate.component';
import { MainComponent } from './pages/main/main.component';

/*services*/
import { UpdatesDataService } from './services/updates-data.service';
import { CurrentUserService } from './services/current-user.service';
import { UsersService } from './services/users.service';
import { CurrentUserGuard } from './services/current-user.guard';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UpdateFormComponent,
    TabsNavigateComponent,
    UpdateComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UpdatesDataService, CurrentUserService, UsersService,
    CurrentUserGuard],
  bootstrap: [AppComponent]
})

export class AppModule {}
