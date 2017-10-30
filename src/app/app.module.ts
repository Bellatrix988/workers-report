import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UpdatesDataService } from './services/updates-data.service';
import { UsersDataService } from './services/users-data.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormCreateComponent } from './components/form-create/form-create.component';
import { ListUpdatesComponent } from './components/list-updates/list-updates.component';
import { TabsNavigateComponent } from './pages/tabs-navigate/tabs-navigate.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUpdatesComponent,
    FormCreateComponent,
    TabsNavigateComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UpdatesDataService, UsersDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
