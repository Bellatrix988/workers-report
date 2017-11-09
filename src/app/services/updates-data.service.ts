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
      param.forEach(item => {
        if (item.value === 'my') {
          params = new HttpParams()
            .set('owner.id', `${this.userService.id}`)
            .set('_order', 'desc')
            .set('_sort', 'created_at');
        }
        else {
          params = new HttpParams()
            .set(`owner.id`, `${item.value}`)
            .set('_order', 'desc')
            .set('_sort', 'created_at');
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
  create(update: Update) {
    update.id = this._id + 1;
    update.owner = this.userService as User;
    console.log(update._toJSON());
    return this.http.post(URL, update._toJSON());
  }

  update() { }

  deleteUpdate(update: Update): void {
    const params = new HttpParams()
      .set(`id`, `${update.id}`);

    if (update.owner.id === this.userService.id) {
      this.http
        .delete(URL + `/${update.id}`)
        .subscribe(successful => console.log('DELETE'),
                   error => console.log(error));
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
