import { Component, OnInit } from '@angular/core';
import { ReportDataService } from '../services/report-data.service';

import { Report } from '../report';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})
export class ListReportsComponent implements OnInit {

  reports: Report[];

  constructor(private reportService: ReportDataService ) { }

  getListReports(): void {
    // this.reportService.getReports()
                      // .then(items => this.reports = items);
  }


  ngOnInit() {
    this.getListReports();
  }

}
