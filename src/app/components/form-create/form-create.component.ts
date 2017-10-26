import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { UsersDataService } from '../../services/users-data.service';

import { Task } from '../../models/task';
import { Update } from '../../models/update';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})

export class FormCreateComponent implements OnInit, OnDestroy, OnChanges {

  private sub: any;

  currentUser: User;
  lastUpadate: Update;
  lastTask: Task[];
  todoTask: Task[];
  problems: string;
  deadline: boolean;
  flagShow: boolean;
  textDone: string;

  constructor(private service: UpdatesDataService,
              private userService: UsersDataService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    console.log(this.currentUser);
    this.getCurrentUser();
    this.getLastTask();

    this.todoTask = [];
    this.problems = '';
    this.deadline = true;
    this.flagShow = false;
  }

  ngOnDestroy() {
    console.log(this.currentUser);
    console.log(this.lastUpadate);
    // this.sub.unsubscribe();
  }

  ngOnChanges() {
    if(this.lastUpadate != undefined)
      this.lastTask = this.lastUpadate.toDo;
  }

  onCheck(e, item: Task) {
    item.active = !e.target.checked;
  }

  addDone(text: string) {
    if(this.flagShow == false)
      this.flagShow = true;
    else {
      let done = { id: 9, title: text, active: false };
      console.log(done);
      if(text != undefined && text != null)
        this.lastTask.push(done);
    }
  }

  addToDo(text: string) {
    const item: Task = { id: 8, title: text, active: true };
    this.todoTask.push(item);
  }

  getLastTask(): void {
    // if(this.currentUser != undefined)
      this.service.getLastTasksOfCurrentUser(this.currentUser.id)
                  .subscribe(update => this.lastUpadate = update);
  if(this.lastUpadate != undefined)
      this.lastTask = this.lastUpadate.toDo;
  }

  getCurrentUser() {
    this.userService.getCurrentUser()
                    .subscribe(user => this.currentUser = user);
  }
}
