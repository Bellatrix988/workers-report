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

export class FormCreateComponent implements OnInit, OnDestroy {

  private sub: any;

  currentUpdate: Update;

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
    this.getLastTask();

    this.currentUpdate = new Update();
    this.todoTask = [];
    this.problems = '';
    this.deadline = true;
    this.flagShow = false;
  }

  ngOnDestroy() {
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
    this.service.getLastTasksOfCurrentUser()
                .subscribe(update => this.lastTask = update);
  }

  // getCurrentUser() {
  //   this.userService.getCurrentUser()
  //                   .subscribe(user => this.service.getLastTasksOfCurrentUser(user.id)
  //                                               .subscribe(update => this.lastTask = update));
  // }
}
