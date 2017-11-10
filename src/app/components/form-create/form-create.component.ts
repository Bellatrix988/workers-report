import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChange } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { Router } from '@angular/router';

import { Task } from '../../models/task.model';
import { Update } from '../../models/update.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})

export class FormCreateComponent implements OnInit, OnDestroy, OnChanges {

  private sub: any;
  private idTask: number;

  public textDone: string;
  public textToDo: string;
  private _update: Update;

  deadline: boolean;
  sucsMsg: boolean;
  flagDelay: boolean;
  message: string;
  flagHaveDone: boolean;

  constructor(private router?: Router,
              private service?: UpdatesDataService) { }

  @Input() update: Update;

  ngOnChanges() { }

  // set update(update: Update) {
  //   this._update = update;
  // }

  // get update(): Update { return this._update; }

  ngOnInit() {
    if (this.update === undefined)
      this.getData();
    this.deadline = true;
    this.flagDelay = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribeClosingNotification();
  }


  keyDownHaveDone(event) {
    if (event.keyCode === 13) {
      this.addDone();
    }
  }

  keyDownToDo(event) {
    if (event.keyCode === 13) {
      this.addToDo();
    }
  }

  onCheck(e, item: Task) {
    item.active = !e.target.checked;
  }


  public setUpdate(update: Update) {
    console.log(this.update);
    this.update = new Update(update);
    console.log(this.update);
  }

  setTEST() {
    this.update.toDo = [ { id: 666, title: '666-TEST-666', active: false} ];
  }

  addUpdate() {
    if (this.update.haveDone.length === 0) {
      this.showMessage('You must add todo', false);
      return;
    }
    this.update.deadline = this.deadline;
    this.service.create(this.update)
      .subscribe(
        successful => {
          this.showMessage('Updated successfully add!', true);
          this.getData();
        },
        err => this.showMessage(err.message, false));
  }

  showMessage(text, type) {
    this.message = text;
    this.sucsMsg = type;
    setTimeout(() => {this.flagDelay = true}, 4000);
  }

  private getData() {
    this.update = new Update();
    this.sub =
      this.service
        .getLastTask()
          .subscribe(data => {
            const activeTasks = data.haveDone
              .filter(item => item.active === true);
            this.update.haveDone = data.toDo.concat(activeTasks);
            this.idTask =
              data.toDo[data.toDo.length - 1].id + 1;
          });
  }

  //
  deleteTaskHaveDone(task: Task) {
    this.update.deleteTaskHaveDone(task);
  }

  //
  deleteTaskToDo(task: Task) {
    this.update.deleteTaskToDo(task);
  }


//
  private addDone() {
    if (this.textDone == null) {
      return;
    }
    this.update.addTaskHaveDone({ id: this.idTask, title: this.textDone, active: false });
    this.idTask++;
    this.textDone = undefined;
  }
//
  private addToDo() {
    if (this.textToDo == null) {
      return;
    }
    this.update.addTaskToDo({ id: this.idTask, title: this.textToDo, active: true });
    this.idTask++;
    this.textToDo = undefined;
  }
}
