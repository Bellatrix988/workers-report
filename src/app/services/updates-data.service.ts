import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CurrentUserService } from './../services/current-user.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Update } from '../models/update.model';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';

import 'rxjs/add/operator/map';

export const URL = `http://localhost:3000/updates`;

@Injectable()
export class UpdatesDataService {

  private currentUser: User;
  lastUpdate: Update;
  updatesCurrentUser: Update[];

  constructor(private http: HttpClient, private userService: CurrentUserService) {}

  getAll(): Observable<Update[]> {
    return this.http
      .get(URL)
      .map(this.extractData);
  }

  create(update: Update) {
    update.owner = this.currentUser;
    return this.http.post(URL, update._toJSON());
  }

  private getLastTask(updates: Update[]) {
     this.updatesCurrentUser = updates;
     this.lastUpdate = this.updatesCurrentUser[0];
  }

  getDataCurrentUser(): Observable<Update[]> {
    console.log('Service ', this.userService.id);
    const params = new HttpParams()
      .set('owner.id', `${this.userService.id}`)
      .set('_order', "desc")
      .set('_sort', "created_at");
    return this.http
      .get(URL, {params})
      .map(this._getDataCU);
  }

  private _getDataCU(res): Update[] {
    let result: Update[] = [];
    res.forEach(item => {
      const record: Update = new Update();
      record._fromJSON(item);
      result.push(record);
    });
    return result;
  }

  // private _wrapGetData(func: Function): Observable<Update[]> {
  //   return Observable.create((observer: Observer<Update[]>) => {
  //     this.userService.getCurrentUser().subscribe(
  //        user => {
  //          this.currentUser = user;
  //          this
  //            .http
  //            .get(URL + `?owner.id=${this.currentUser.id}&_sort=created_at&_order=desc`)
  //            .subscribe(
  //              (res: Response) => {
  //                const data = this.extractData(res);
  //                func(data);
  //                observer.next(data);
  //                observer.complete();
  //               },
  //               error => observer.error(error)
  //             );
  //           }
  //      );
  //   });
  // }

  getLastTasksOfCurrentUser(): Observable<Task[]> {
    // return;
    // return this.http.get(URL + `?owner.id=${user.id}&_sort=created_at&_order=desc`)
    //                  .map(this.extractData);
    return Observable.create((observer: Observer<Task[]>) => {
      this.userService.load().subscribe(
         user => {
           this.currentUser = user;
           console.log(this.currentUser);
           this
             .http
             .get(URL + `?owner.id=${user.id}&_sort=created_at&_order=desc`)
             .subscribe(
               (res: Response) => {
                 this.updatesCurrentUser = this.extractData(res);
                 const data = this.updatesCurrentUser[0];
                 this.lastUpdate = data;
                 observer.next(data.toDo);
                 observer.complete();
                },
                error => observer.error(error)
              );
            }
       );
    });
  }

  private extractData(res): Update[] {
    let result: Update[] = [];
    res.forEach(item => {
      const record: Update = new Update();
      record._fromJSON(item);
      result.push(record);
    });
    return result;
  }

}
