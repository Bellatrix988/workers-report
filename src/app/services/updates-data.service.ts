import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { UsersDataService } from './users-data.service';

import { Update } from '../models/update';
import { User } from '../models/user';
import { Task } from '../models/task';

import 'rxjs/add/operator/map';


@Injectable()
export class UpdatesDataService {

  private updateUrl = `http://localhost:3000/updates`;
  private currentUser: User;

  constructor(private http: Http, private userService: UsersDataService) {}

  private extractData(res: Response): Update[] {
    const body = res.json();
    let result: Update[] = [];
    body.forEach(item => {
      let record: Update = new Update();
      record._fromJSON(item);
      result.push(record)});
    return result;
  }

  private extractLastTasks(data: Update[]): Task[] {
    return data[0].toDo as Task[];
  }
//get last update => get last id and get last id task
  private getLastUpdate(){
     return Observable.create((observer: Observer<Update>) => {
           this
             .http
             .get(this.updateUrl + `?_sort=created_at&_order=desc`)
             .subscribe(
               (res: Response) => {
                 let data = this.extractData(res);
                 observer.next(data[data.length - 1]);
                 observer.complete();
                },
                error => observer.error(error)
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
                 let data = this.extractLastTasks(this.extractData(res));
                 observer.next(data);
                 observer.complete();
                },
                error => observer.error(error)
              );
            }
       );
    });
  }

  getUpdates(): Observable<Update[]> {
    return this.http.get(this.updateUrl)
                      .map(this.extractData);
  }

  addUpdates(body) {
    body.owner = this.currentUser;
    body.id = 29;
    return this.http.post(this.updateUrl, body);
  }

}
