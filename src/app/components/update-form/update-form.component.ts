import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { Task } from '../../models/task.model';
import { Update } from '../../models/update.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})

export class UpdateFormComponent implements OnInit, OnDestroy {

  private sub: any;
  private _id: number;

  public textDone: string;
  public textToDo: string;

  public deadline: boolean;
  public sucsMsg: boolean;
  public flagDelay: boolean;
  public message: string;
  public flagHaveDone: boolean;
  private timer;
  private _changedModel: boolean;

  constructor(private service: UpdatesDataService) { }

  @Input() update: Update;
  @Output() onHiddenForm = new EventEmitter<boolean>();

  @Output() changedForm = new EventEmitter<boolean>();
  @Input()

  get changedModel(): boolean { return this._changedModel; }

  set changedModel(value: boolean) {
    this._changedModel = value;
    if (value) {
      this.getData();
    }
  }

  public hiddenForm() {
    this.onHiddenForm.emit(true);
  }

  ngOnInit() {
    if (this.update === undefined) {
      this.getData();
    }
    if (this.changedModel) {
      this.getData();
    }
    this.deadline = true;
    this.flagDelay = false;
  }

  ngOnDestroy() {
  }


  public deleteTaskHaveDone(task: Task) {
    this.update.deleteTaskHaveDone(task);
  }

  public deleteTaskToDo(task: Task) {
    this.update.deleteTaskToDo(task);
  }

  public addUpdate() {
    if (this.update.haveDone.length === 0) {
      this.showMessage('You must add todo', false);
      return;
    }
    if (this.update.id === undefined) {
    this.update.deadline = this.deadline;
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

/// ------------------------- methods for handler form.

  public keyDownHaveDone(event) {
    if (event.keyCode === 13) {
      this.addDone();
    }
  }

  public keyDownToDo(event) {
    if (event.keyCode === 13) {
      this.addToDo();
    }
  }

  public onCheck(e, item: Task) {
    item.active = !e.target.checked;
  }

  private showMessage(text, type) {
    clearTimeout(this.timer);
    this.message = text;
    this.sucsMsg = type;
    this.timer = setTimeout(() => { this.flagDelay = true; }, 4000);
  }

  private getData() {
    this.update = new Update();
    this.sub =
      this.service
        .getBy({'id': 'my'})
          .subscribe(response => {
            let data = response[0];
            const activeTasks = data.haveDone
              .filter(item => item.active === true);
            this.update.haveDone = data.toDo.concat(activeTasks);
            const arr = !!this.update.toDo.length ?  this.update.toDo : this.update.haveDone;
            this._id = arr[arr.length - 1].id + 1;
          });
  }

  private addDone() {
    if (this.textDone == null) {
      return;
    }
    this.update.addTaskHaveDone({ id: this._id, title: this.textDone, active: false });
    this._id++;
    this.textDone = undefined;
  }

  private addToDo() {
    if (this.textToDo == null) {
      return;
    }
    this.update.addTaskToDo({ id: this._id, title: this.textToDo, active: true });
    this._id++;
    this.textToDo = undefined;
  }
}
