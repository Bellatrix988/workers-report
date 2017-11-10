import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Update } from '../models/update.model';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { CurrentUserService } from './../services/current-user.service';

import 'rxjs/add/operator/map';

export const URL = `http://localhost:3000/updates`;

@Injectable()
export class UpdatesDataService {

  _id: number;
  constructor(private http: HttpClient,
              private userService: CurrentUserService) {}

  getBy(param?: any): Observable<Update[]> {
    if (!!param) {
    let params = new HttpParams();
      params = new HttpParams()
        .set('_order', 'desc')
        .set('_sort', 'created_at');

      param.forEach(item => {
        if (item.value === 'my') {
          params = params.set('owner.id', `${this.userService.id}`);
        }
        else {
          params = params.set(`owner.id`, `${item.value}`);
        }
      });
      return this.http
        .get(URL, {params})
        .map(this._getUpdates);
    }
    return this.http
      .get(URL)
      .map(this._getUpdates);
  }

  // add new Update form currentUser
  create(update: Update): Observable<Object> {
    update.id = this._id + 1; // object return?
    update.owner = this.userService as User;
    const obj = this.http.post(URL, update._toJSON());
    console.log(obj);
    return obj;
  }

  update(update: Update) {
    return this.http.put(`${URL}/${update.id}`, update._toJSON());
  }

 // TODO: delete rename
  deleteUpdate(update: Update) {
    const params = new HttpParams()
      .set(`id`, `${update.id}`);
    if (update.owner.id === this.userService.id) {
      return this.http
        .delete(`${URL}/${update.id}`);
    }
  }

  // get last task in DB
  getLastTask(): Observable<Update> {
    return this.getBy([{'key': '', 'value': 'my'}])
      .map(item => this._getTasks(item));
  }

  private _getTasks(updates: Update[]): Update {
     this._id = updates[0].id;
     return updates[0];
  }

  private _getUpdates(res): Update[] {
    return res.map(item => {
      const record: Update = new Update();
      record._fromJSON(item);
      return record;
    });
  }
}
