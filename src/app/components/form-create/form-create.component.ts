import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
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

export class FormCreateComponent implements OnInit, OnDestroy {

  private sub: any;
  private idTask: number;

  currentUpdate: Update;

  public textDone: string;
  public textToDo: string;

  deadline: boolean;
  sucsMsg: boolean;
  flagDelay: boolean;
  message: string;

  flagHaveDone: boolean;
  constructor(private router: Router,
              private service: UpdatesDataService) { }

  ngOnInit() {
    this.getData();
    this.deadline = true;
    this.flagDelay = false;
    // this.showMessage('HELLO',true);
  }

  ngOnDestroy() {
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

  deleteTaskHaveDone(task: Task) {
    const index = this.currentUpdate.haveDone.indexOf(task);
    if (index !== -1) {
      this.currentUpdate.haveDone.splice(index, 1);
    }
  }

  deleteTaskToDo(task: Task) {
    const index = this.currentUpdate.toDo.indexOf(task);
    console.log(task);
    if (index !== -1) {
      this.currentUpdate.toDo.splice(index, 1);
    }
  }

  addUpdate() {
    if (this.currentUpdate.haveDone.length === 0) {
      this.showMessage('You must add todo', false);
      return;
    }
    this.currentUpdate.deadline = this.deadline;
    this.service.create(this.currentUpdate)
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
    this.currentUpdate = new Update();
    this.sub =
      this.service
        .getLastTask()
          .subscribe(data => {
            const activeTasks = data.haveDone
              .filter(item => item.active === true);
            this.currentUpdate.haveDone = data.toDo.concat(activeTasks);
            this.idTask =
              data.toDo[data.toDo.length - 1].id + 1;
          });
  }

  private addDone() {
    if (this.textDone == null) {
      return;
    }
    this.currentUpdate.haveDone.push({ id: this.idTask, title: this.textDone, active: false });
    this.idTask++;
    this.textDone = undefined;
  }

  private addToDo() {
    if (this.textToDo == null) {
      return;
    }
    this.currentUpdate.toDo.push({ id: this.idTask, title: this.textToDo, active: true });
    this.idTask++;
    this.textToDo = undefined;
  }
}
