import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Report } from '../models/report';
import { Worker } from '../models/worker';
import { Task } from '../models/task';

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

  getCurrentUser(): Observable<Worker> {
    return this.http.get(this.reportUrl)
                    .map(this.extractCurrentUser);
  }

  getLastTask(id: number): Observable<Report> {
    const data = this.getAllTasks(id);
    console.log(data);
    return data.sort((a,b)=> a.id - b.id)[data.length - 1];
  }

  // addReport(): void {

  // }

  private getAllTasks(id: number) {
    let result = [];
    const data = this.getReports().subscribe(
       data => {
         result = data.filter(item => item.owner.id === id);
       }
      );
    return result;
  }

  private handleError(error: any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.updates as Report[];
  }

  private extractUsers(res: Response) {
    return res.json().users.data as Worker[];
  }

  private extractCurrentUser(res: Response) {
    return res.json().users.me as Worker;
  }
}

