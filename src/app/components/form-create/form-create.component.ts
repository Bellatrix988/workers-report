import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Validators, NgForm } from '@angular/forms';
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

  deadline: boolean;
  private idTask: number;
  private idUpdates: number;
  message: string;
  textDone: string;
  textToDo: string;
  reason: string;
  problems: string;

  constructor(private router: Router,
              private service: UpdatesDataService) { }

  ngOnInit() {
    this.getLastTask();
    this.getCurrentId();

    this.currentUpdate = [];
    this.todoTask = [];
    this.problems = '';
    this.reason = '';
    this.deadline = true;
  }

  ngOnDestroy() {
  }

  keyDownHaveDone(event) {
    if(event.keyCode == 13) {
      this.addDone(this.textDone);
      this.textDone = null;
    }
  }

  keyDownToDo(event) {
    if(event.keyCode == 13) {
      this.addToDo();
      this.textToDo = null;
    }
  }

  onCheck(e, item: Task) {
    item.active = !e.target.checked;
  }

  private addDone(text: string) {
      let done = { id: this.idTask, title: text, active: false };
      this.idTask++;
      console.log(done);
      this.lastTask.push(done);
  }

  private addToDo() {
    const item: Task = { id: this.idTask, title: this.textToDo, active: true };
    this.idTask++;
    this.todoTask.push(item);
  }

  putProblem() {
    alert(this.problems);
  }

  getLastTask(): void {
    this.service.getLastTasksOfCurrentUser()
                .subscribe(update => this.lastTask = update);
  }

  addUpdate() {

    if(this.todoTask.length != 0 && this.canDeactivate()){
      const body = {id: this.idUpdates, owner: {},
                    created_at: new Date().toJSON(), have_done: this.lastTask, todo: this.todoTask,
                     problems: this.problems, deadline: this.deadline, reason: this.reason};
      this.textToDo = undefined;
      this.service.addUpdates(body).subscribe(
          successful => {
            this.message = 'Updated successfully add!';
            this.gotoIndex()
          },
          err => this.message = err);
      }
      else
        this.message = 'You most add todo';
  }

  private getCurrentId() {
    this.service
         .getLastUpdate()
           .subscribe(
              item =>
              {
                this.idTask = item.toDo[item.toDo.length - 1].id + 1;
                this.idUpdates = item.id + 1});
  }

  private gotoIndex() {
    this.router.navigate(['/index']);
  }

  canDeactivate() {
    // if(this.todoTask.length == 0) {
    //   this.message = 'You most add todo';
    //   return false;
    // }

    if (this.textDone !== undefined || this.textToDo !== undefined) {
      return window.confirm('Есть несохраненные изменения. Удалить их?');
    }
    return true;
  }
}
