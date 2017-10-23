import { Worker } from './worker';
import { Task } from './task';

export interface Report {
  id: number;
  owner: Worker;
  dataCreate: Date;
  whatDid: Task[];
  toDoList: Task[];
  problems?: string;
  deadline: boolean;
  reason?: string;
}
