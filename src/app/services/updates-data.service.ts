import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UsersDataService } from './users-data.service';

import { Update } from '../models/update';
import { User } from '../models/user';
import { Task } from '../models/task';

import 'rxjs/add/operator/map';


@Injectable()
export class UpdatesDataService {

  private updateUrl = `http://localhost:3000/updates`;
  private id: number = -1;

  constructor(private http: Http, private userService: UsersDataService) {
    console.log('contructor');
    userService = new UsersDataService(http);
    userService.getCurrentUser();
   }

  private extractData(res: Response): Update[] {
    const body = res.json();
    // console.log('body: ',body);
    let result: Update[] = [];
    body.forEach(item => {
      let record: Update = new Update();
      record._fromJSON(item);
      // console.log(record);
      result.push(record)});
    return result;
  }

  private extractDataCurrentUser(res: Response): Update[]{
    return res.json();
  }

  private extractLastTasks(data: Update[]): Update {
    return data[0] as Update;
  }

  // //--main

  getLastTasksOfCurrentUser(id: number): Observable<Update> {
    console.log(this.userService.currentUser);
    return this.http.get(this.updateUrl + `?owner.id=${id}&_sort=created_at&_order=desc`)
               .map(this.extractData)
               .map(this.extractLastTasks);
  }

  getUpdates(): Observable<Update[]> {
    return this.http.get(this.updateUrl)
               .map(this.extractData);
  }
}
