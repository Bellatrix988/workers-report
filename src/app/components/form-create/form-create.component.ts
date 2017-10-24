import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { UpdatesDataService} from '../../services/report-data.service';
import { Task } from '../../models/task';
import { Report } from '../../models/report';
import { Worker } from '../../models/worker';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})

export class FormCreateComponent implements OnInit, OnDestroy{

  private sub: any;

  currentUser: Worker;
  lastTask: Task[];
  todoTask: Task[];
  problems: string;
  deadline: boolean;
  flagShow: boolean;
  textDone: string;

  constructor(private service: UpdatesDataService) { }

  ngOnInit() {
    // this.getCurrentUser();
    this.getLastTask();

    this.todoTask = [];
    this.problems = '';
    this.deadline = true;
    this.flagShow = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCheck(e, item: Task) {
    item.isActive = !e.target.checked;
  }

  addDone(text: string) {
    if(this.flagShow == false)
      this.flagShow = true;
    else {
      let done = { id: 9, title: text, isActive: false };
      console.log(done);
      if(text != undefined && text != null)
        this.lastTask.push(done);
    }
  }

  addToDo(text: string) {
    const item: Task = { id: 8, title: text, isActive: true };
    this.todoTask.push(item);
  }

  // getCurrentUser(): void {
  //   this.sub = this.service.getCurrentUser().subscribe(
  //   data => {
  //     this.currentUser = data;
  //   });
  // }

  getLastTask(): void {
    this.sub = this.service.getLastTasksOfCurrentUser().subscribe(
      data => this.lastTask = data
    );
    // let dataReports;
    // this.sub = this.service.getReports().subscribe(
    //      data => {
    //        dataReports = data.filter(item => item.owner.id === this.currentUser.id) as Report[];
    //        let item = dataReports[dataReports.length - 1] as Report;
    //        this.lastTask = item.toDo;
    //      });
  }

}
