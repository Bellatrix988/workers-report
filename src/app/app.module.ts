import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListReportsComponent } from './list-reports/list-reports.component';
import { ReportDataService } from './services/report-data.service';



@NgModule({
  declarations: [
    AppComponent,
    ListReportsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ReportDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
