import { Worker } from './worker';
import { Task } from './task';

export class Report {
  id: number;
  owner: Worker;
  createdAt: Date;
  haveDone: Task[];
  toDo: Task[];
  problems?: string;
  deadline: boolean;
  reason?: string;

  constructor(id: number, owner: Worker, createdAt: Date, haveDone: Task[],
              toDo: Task[], deadline: boolean, problems?: string, reason?: string)
  {
    this.id = id;
    this.owner = owner;
    this.createdAt = createdAt;
    this.haveDone = haveDone;
    this.toDo = toDo;
    this.deadline = deadline;
    this.problems = problems;
    this.reason = reason;
  }
}

