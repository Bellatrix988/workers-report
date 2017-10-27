import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { UsersDataService } from '../../services/users-data.service';
import { Router } from '@angular/router';

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

  currentUpdate: Update[];

  lastUpadate: Update;
  lastTask: Task[];
  todoTask: Task[];
  reason: string;
  problems: string;
  deadline: boolean;
  flagShow: boolean;
  private idTask: number;
  message: string;

  constructor(private router: Router,
              private service: UpdatesDataService) { }

  ngOnInit() {
    this.getLastTask();

    this.currentUpdate = [];
    this.todoTask = [];
    this.problems = '';
    this.reason = '';
    this.deadline = true;
    this.flagShow = false;
    this.idTask = 100;
  }

  ngOnDestroy() {
  }

  onCheck(e, item: Task) {
    item.active = !e.target.checked;
  }

  addDone(text: string) {
    if(this.flagShow){
      let done = { id: this.idTask, title: text, active: false };
      this.idTask++;
      console.log(done);
      this.lastTask.push(done);
    }
    else
      this.flagShow = true;
  }

  addToDo(text: string) {
    const item: Task = { id: this.idTask, title: text, active: true };
    this.idTask++;
    this.todoTask.push(item);
  }

  getLastTask(): void {
    this.service.getLastTasksOfCurrentUser()
                .subscribe(update => this.lastTask = update);
  }
  private gotoIndex() {
    this.router.navigate(['/index']);
  }
  addUpdate() {
    const body = {id: -1, owner: {},
                  created_at: new Date().toJSON(), have_done: this.lastTask, todo: this.todoTask,
                   problems: this.problems, deadline: this.deadline, reason: this.reason};
    this.service.addUpdates(body).subscribe(
        successful => {this.message = 'Updated successfully add!'; this.gotoIndex()},
        err => this.message = err);
  }
}
