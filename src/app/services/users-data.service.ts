import { Injectable, Injector } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class UsersDataService {

  private reportUrl = `http://localhost:3000/profile`;
  currentUser: User;

  constructor(private http: Http) { }

  private extractCurrentUser(res: Response) {
    this.currentUser = new User();
    this.currentUser._fromJSON(res.json());
    return this.currentUser;
  }

  getCurrentUser() {
    return this.http.get(this.reportUrl)
               .map(this.extractCurrentUser);
  }
}

//-json-server -- foreignKey
