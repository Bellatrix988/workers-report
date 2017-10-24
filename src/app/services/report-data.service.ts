import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UsersDataService } from './users-data.service';

import { Report } from '../models/report';
import { Worker } from '../models/worker';
import { Task } from '../models/task';

import 'rxjs/add/operator/map';


@Injectable()
export class UpdatesDataService {

  private reportUrl = `http://localhost:3000/db`;
  private currentUser: Worker;

  constructor(private http: Http, private usersService: UsersDataService) {
    usersService.getCurrentUser().subscribe(user => this.currentUser = user);
    console.log('constructor ', this.currentUser);
  }

  //----helper functions
  private handleError(error: any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private extractData(res: Response): Report[] {
    const body = res.json().updates;
    let result = [];
    body.forEach(item => {
        let toDo = [];
        let haveDone = [];
        item.todo.forEach(ix => toDo.push(new Task(ix.id, ix.title, ix.is_active)));
        item.have_done.forEach(ix => haveDone.push(new Task(ix.id, ix.title, ix.is_active)));
        result.push(new Report(item.id, item.owner as Worker,
                            item.created_at, haveDone, toDo, item.deadline,
                            item.problems, item.reason))
                          });
    return result;
  }

  private extractDataCurrentUser(data: Report[]): Report[] {
    console.log('data',data);
    console.log('current user', this.currentUser);
    return data.filter(item => item.owner.id === this.currentUser.id) as Report[];
  }

  private extractLastTasks(data: Report[]): Task[] {
    return data[data.length - 1].toDo as Task[];
  }

  //--main

  getLastTasksOfCurrentUser() {
    return this.http.get(this.reportUrl)
               .map(this.extractData)
               .map(this.extractDataCurrentUser)
               .map(this.extractLastTasks);

  }

  getReports(): Observable<Report[]> {
    return this.http.get(this.reportUrl)
               .map(this.extractData);
  }

  getCurrentUser() {
    // this.usersService.getCurrentUser()
    //       .subscribe(item => this.currentUser = item);

  }

  addReport(): void {
    // return this.http.post()
  }

}
