import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { UsersDataService } from './users-data.service';

import { Update } from '../models/update.model';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';

import 'rxjs/add/operator/map';


@Injectable()
export class UpdatesDataService {

  private updateUrl = `http://localhost:3000/updates`;
  private currentUser: User;
  lastUpdate: Update;
  updatesCurrentUser: Update[];

  constructor(private http: Http, private userService: UsersDataService) {}

  getAll(): Observable<Update[]> {
    return this.http.get(this.updateUrl)
             .map(this.extractData);
  }

  create(update: Update) {
    update.owner = this.currentUser;
    return this.http.post(this.updateUrl, update._toJSON());
  }

  private getLastTask(updates: Update[]) {
     this.updatesCurrentUser = updates;
     let data = this.updatesCurrentUser[0];
     this.lastUpdate = data;
  }


  getDataCurrentUser(): Observable<Update[]> {
    return this._wrapGetData(function(){});
  }

  private _wrapGetData(func: Function): Observable<Update[]> {
    return Observable.create((observer: Observer<Update[]>) => {
      this.userService.getCurrentUser().subscribe(
         user => {
           this.currentUser = user;
           this
             .http
             .get(this.updateUrl + `?owner.id=${this.currentUser.id}&_sort=created_at&_order=desc`)
             .subscribe(
               (res: Response) => {
                 let data =  this.extractData(res);
                 func(data);
                 observer.next(data);
                 observer.complete();
                },
                error => observer.error(error)
              );
            }
       );
    });
  }

  getLastTasksOfCurrentUser(): Observable<Task[]> {
    return Observable.create((observer: Observer<Task[]>) => {
      this.userService.getCurrentUser().subscribe(
         user => {
           this.currentUser = user;
           this
             .http
             .get(this.updateUrl + `?owner.id=${user.id}&_sort=created_at&_order=desc`)
             .subscribe(
               (res: Response) => {
                 this.updatesCurrentUser = this.extractData(res);
                 let data = this.updatesCurrentUser[0];
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

  private extractData(res: Response): Update[] {
    const body = res.json();
    let result: Update[] = [];
    body.forEach(item => {
      let record: Update = new Update();
      record._fromJSON(item);
      result.push(record)});
    return result;
  }

}
