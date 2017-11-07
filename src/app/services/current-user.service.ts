import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { User } from './../models/user.model';

export const URL = `http://localhost:3000/profile`;

@Injectable()
export class CurrentUserService extends User {

  constructor(private _http: HttpClient) {
    super();
   }

  load(): Observable<User> {
    return Observable.create(
      (observer: Observer<User>) => {
        this._http
          .get(URL)
          .subscribe(
            (res: Response) => {
              this._fromJSON(res);
              observer.next(this);
              observer.complete();
            },
            error => observer.error(error)
          );
      }
    );
  }
}
