import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Update } from '../models/update.model';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { CurrentUserService } from './../services/current-user.service';

export const URL = `http://localhost:3000/updates`;

@Injectable()
export class UpdatesDataService {

  constructor(private http: HttpClient,
              private userService: CurrentUserService) {}

  /*Get data by params*/
  getBy(routeParams?: any): Observable<Update[]> {
    let params = new HttpParams()
      .set('_order', 'desc')
      .set('_sort', 'created_at');
    if (!!routeParams) {
        if (routeParams.id === 'my') {
          params = params.set('owner.id', `${this.userService.id}`);
        }
        if (!!+routeParams.id) {
          params = params.set(`owner.id`, `${routeParams.id}`);
        }
    }
    return this.http
      .get(URL, {params})
      .map(this._getUpdates);
  }

  create(update: Update): Observable<Update> {
    update.owner = this.userService as User;
    return this.http.post<Update>(URL, update._toJSON());
  }

  update(update: Update): Observable<Update> {
    return this.http.put<Update>(`${URL}/${update.id}`, update._toJSON());
  }

  delete(update: Update): Observable<Update> {
    if (update.owner.id === this.userService.id) {
      return this.http
        .delete<Update>(`${URL}/${update.id}`);
    } else {
      return;
    }
  }

  private _getUpdates(res): Update[] {
    return res.map(item => {
      const record: Update = new Update();
      record._fromJSON(item);
      return record;
    });
  }
}
