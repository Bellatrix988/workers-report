import { Injectable, Injector } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { User } from '../models/user';

//HttpClient

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
      this. currentUser = this
                            .http
                              .get(this.reportUrl)
                                .map(this.extractCurrentUser);
    return this.currentUser;
    // return Observable.create((observer: Observer<User>) => {
    //   this
    //     .http
    //     .get(this.reportUrl)
    //     .subscribe(
    //       (res: Response) => {
    //         let curUser = new User();
    //         curUser._fromJSON(res.json());
    //         console.log(curUser);
    //         this.user = curUser;
    //         observer.next(curUser);
    //         observer.complete();
    //       },
    //       error => observer.error(error)
    //     );
    // });
  }
}
