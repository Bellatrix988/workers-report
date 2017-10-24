import { Injectable, Injector } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Worker } from '../models/worker';

@Injectable()
export class UsersDataService {

  static injector: Injector;
  private reportUrl = `http://localhost:3000/db`;
  private currentUser: Worker;

  constructor(private http: Http) { }

  private extractUsers(res: Response) {
    return res.json().users.data as Worker[];
  }

  private extractCurrentUser(res: Response) {
    this.currentUser = res.json().users.me;
    return this.currentUser;
  }

  getCurrentUser(): Observable<Worker> {
    return this.http.get(this.reportUrl)
               .map(this.extractCurrentUser);
  }

}
