import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ListUpdatesComponent } from './pages/list-updates/list-updates.component';
import { UpdatesDataService } from './services/updates-data.service';
import { UsersDataService } from './services/users-data.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormCreateComponent } from './components/form-create/form-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUpdatesComponent,
    FormCreateComponent
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
