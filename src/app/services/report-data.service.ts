import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Report } from '../models/report';

import 'rxjs';

@Injectable()
export class ReportDataService {

  private reportUrl = `api/reports`;

  constructor(private http: Http) { }

  getReports(): Observable<Report[]> {
    return this.http.get(this.reportUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private extractData(res: Response) {
    return res.json() as Report[];
  }
}

