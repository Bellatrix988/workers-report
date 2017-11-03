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
  message: string;

  constructor(private router: Router,
              private service: UpdatesDataService) { }

  ngOnInit() {
    this.getData();

    this.currentUpdate = new Update();
    this.deadline = true;
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


  addUpdate() {
    console.log(this.currentUpdate);
    if (this.currentUpdate.toDo.length === 0) {
      this.message = 'You must add todo';
      return;
    }
    const activeTasks = this.currentUpdate.haveDone
                        .filter(item => item.active === true);
    this.currentUpdate.toDo = this.currentUpdate.toDo
                                .concat(activeTasks);
    this.currentUpdate.deadline = this.deadline;
    this.service.create(this.currentUpdate).subscribe(
        successful => {
          this.message = 'Updated successfully add!';
          this.gotoIndex();
        },
        err => this.message = err);
  }

  canDeactivate() {
    if (this.textDone !== undefined || this.textToDo !== undefined) {
      return window.confirm('Есть несохраненные изменения. Удалить их?');
    }
    return true;
  }

  private getData(): void {
    this.sub =
              this.service
                .getLastTasksOfCurrentUser()
                  .subscribe(data => {
                    this.currentUpdate.haveDone = data;
                    const item = this.service.lastUpdate;
                    this.idTask = item.toDo[item.toDo.length - 1].id + 1;
                    this.currentUpdate.id = item.id + 1;
                  });
  }

  private gotoIndex() {
    this.router.navigate(['/index']);
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
