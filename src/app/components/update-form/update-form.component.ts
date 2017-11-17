import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { Task } from '../../models/task.model';
import { Update } from '../../models/update.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})

export class UpdateFormComponent implements OnInit, OnDestroy {

  private sub: any;
  private _id: number; /* temp-var for id of task */

  public update: Update;  /* Current update in the form */

  /* The list variables for binding with form's components */
  public textDone: string;
  public textToDo: string;

  // Variables for show message
  private timer;
  public sucsMsg: boolean;
  public message: string;
  public flagShowMessage: boolean;

  constructor(private service: UpdatesDataService) { }

  /* For hidden form in the Parent Component */
  @Output() onHiddenForm = new EventEmitter<boolean>();
  /* For refresh data on the 'List of updates' after send data from form */
  @Output() changedForm = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.update === undefined) {
      this.getData();
    }
    this.flagShowMessage = false;
  }

  ngOnDestroy() {
  }

  // onClick on button-hide-form
  public hiddenForm(): void {
    this.onHiddenForm.emit(true);
  }

  public deleteTaskHaveDone(task: Task): void {
    this.update.deleteTaskHaveDone(task);
  }

  public deleteTaskToDo(task: Task): void {
    this.update.deleteTaskToDo(task);
  }

  public addUpdate(): void {
    if (!this.update.haveDone.length) {
      this.showMessage('You must add todo', false);
      return;
    }
    if (!this.update.id) {
    this.service.create(this.update)
      .subscribe(
        successful => {
          this.showMessage('Updated successfully add!', true);
          this.changedForm.emit(true);
          this.getData();
        },
        err => this.showMessage(err.message, false));
    } else {
    this.service.update(this.update)
      .subscribe(
        sucss => { this.changedForm.emit(true); },
        err => this.showMessage(err.message, false));
    }
  }

  public refreshForm(): void {
    this.getData();
  }

/* ------Methods for handler form--------*/

  public keyDownHaveDone(event): void {
    if (event.keyCode === 13) {
      this.addDone();
    }
  }

  public keyDownToDo(event): void {
    if (event.keyCode === 13) {
      this.addToDo();
    }
  }

  public onCheck(e, item: Task): void {
    item.active = !e.target.checked;
  }

  public changeDeadline(): void {
    this.update.deadline = !this.update.deadline;
  }

  private getData(): void {
    this.update = new Update();
    this.sub =
      this.service
        .getBy({'id': 'my'})
          .subscribe(response => {
            const data = response[0];
            const activeTasks = data.haveDone
              .filter(item => item.active);
            this.update.haveDone = data.toDo.concat(activeTasks);
            const arr = !this.update.toDo.length ?  data.haveDone : this.update.toDo;
            this._id = Math.max.apply(Math, arr.map(task => task.id));
          });
  }

  private showMessage(text, type): void {
    clearTimeout(this.timer);
    this.flagShowMessage = false;
    this.message = text;
    this.sucsMsg = type;
    this.timer = setTimeout(() => { this.flagShowMessage = true; }, 4000);
  }

  private addDone(): void {
    if (!this.textDone) {
      return;
    }
    this.update.addTaskHaveDone({ id: this._id++, title: this.textDone, active: false });
    this.textDone = undefined;
  }

  private addToDo(): void {
    if (this.textToDo === undefined) {
      return;
    }
    this.update.addTaskToDo({ id: this._id++, title: this.textToDo, active: true });
    this.textToDo = undefined;
  }
}
