import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Report } from '../models/report';

import 'rxjs/add/operator/map';

@Injectable()
export class ReportDataService {

  private reportUrl = `http://localhost:3000/db`;

  constructor(private http: Http) { }

  getReports(): Observable<Report[]> {
    return this.http.get(this.reportUrl)
                    .map(this.extractData);
                    // .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private extractData(res: Response) {
    const body = res.json();
    console.log(body.data);
    return body.data as Report[];
  }
}

