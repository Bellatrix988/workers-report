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

  constructor() {
    super();
    this.toDo = [];
    this.haveDone = [];
    this.createdAt = new Date();
    this.owner = undefined;
    this.deadline = true;
  }
}

