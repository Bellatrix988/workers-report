import { Injectable, Injector } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { User } from '../models/user.model';


@Injectable()
export class UsersDataService {

  private reportUrl = `http://localhost:3000/profile`;
  private currentUser: Observable<User>;
  public user: User;

  constructor(private http: Http) { }

  private extractCurrentUser(res: Response) {
    this.user = new User();
    this.user._fromJSON(res.json());
    return this.user;
  }

  getCurrentUser(): Observable<User> {
    if(this.currentUser === undefined)
      this. currentUser = this.http
                            .get(this.reportUrl)
                              .map(this.extractCurrentUser);
    return this.currentUser;
  }
}
