import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data-service.service';

import { AppComponent } from './app.component';
import { ListReportsComponent } from './pages/list-reports/list-reports.component';
import { ReportDataService } from './services/report-data.service';
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
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [ReportDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
