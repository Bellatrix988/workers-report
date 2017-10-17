export interface Report {
  id: number;
  owner: Worker;
  dataCreate: Date;
  whatDid: string[];
  toDoList: string[];
  problems: string;
  // deadline: boolean;
}
