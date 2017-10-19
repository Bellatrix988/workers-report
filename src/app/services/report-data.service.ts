import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Report } from '../report';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportDataService {

  // private date = new Date(2017,2,27).toString();
  private reportUrl = `api/reports`;
  // private reportUrl = 'api/reports/?deadline=true';

  private meUrl = 'api/me';

  constructor(private http: Http) { }

  getReports(): Promise<Report[]> {
    return this.http.get(this.reportUrl, {headers: this.headers})
                    .toPromise()
                    .then(repsonse => repsonse.json().data as Report[])
                    .catch(this.handleError);
  }

  create(): Promise<Report> {
    return;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({'Content-Type': 'application/json'});
}

