import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListReportsComponent } from './pages/list-reports/list-reports.component';
import { UpdatesDataService } from './services/report-data.service';
import { UsersDataService } from './services/users-data.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormCreateComponent } from './components/form-create/form-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ListReportsComponent,
    FormCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UpdatesDataService, UsersDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
