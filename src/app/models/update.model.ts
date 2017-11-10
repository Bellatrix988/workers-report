import { Alias, AppModel } from 'tsmodels';
import { User } from './user.model';
import { Task } from './task.model';

export class Update extends AppModel {
  @Alias('id') public id: number;
  @Alias('owner') public owner: User;
  @Alias('created_at') public createdAt: Date;
  @Alias('have_done') public haveDone: Task[];
  @Alias('todo') public toDo: Task[];
  @Alias('problems') public problems?: string;
  @Alias('deadline') public deadline: boolean;
  @Alias('reason') public reason?: string;

  constructor(update?) {
    super();
    if (update) {
      this.id = update.id;
      this.owner = update.owner;
      this.createdAt = update.createdAt;
      this.haveDone = update.haveDone;
      this.toDo = update.toDo;
      this.problems = update.problems;
      this.deadline = update.deadline;
      this.reason = update.reason;
    } else {
      this.toDo = [];
      this.haveDone = [];
      this.createdAt = new Date();
      this.owner = undefined;
      this.deadline = true;
    }
  }

  public addTaskHaveDone(task: Task) {
    this.haveDone.push(task);
  }

  public addTaskToDo(task: Task) {
    this.toDo.push(task);
  }

  public deleteTaskHaveDone(task: Task) {
    const index = this.haveDone.indexOf(task);
    if (index !== -1) {
      this.haveDone.splice(index, 1);
    }
  }

  public deleteTaskToDo(task: Task) {
    const index = this.toDo.indexOf(task);
    if (index !== -1) {
      this.toDo.splice(index, 1);
    }
  }
}

