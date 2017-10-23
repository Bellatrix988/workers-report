import { Worker } from './worker';
import { Task } from './task';

export interface Report {
  id: number;
  owner: Worker;
  created_at: Date;
  have_done: Task[];
  todo: Task[];
  problems?: string;
  deadline: boolean;
  reason?: string;
}
