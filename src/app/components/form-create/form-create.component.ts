import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportDataService} from '../../services/report-data.service';
import { Task } from '../../models/task';
import { Report } from '../../models/report';
import { Worker } from '../../models/worker';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})

export class FormCreateComponent implements OnInit, OnDestroy {

  private sub: any;

  lastTask: Task[];
  currentUser: Worker;

  constructor(private service: ReportDataService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getLastTask();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCheck(e, item: Task){
    item.isActive = !e.target.checked;
    console.log(item);
  }

  getCurrentUser(): void {
    this.sub = this.service.getCurrentUser().subscribe(
    data => {
      this.currentUser = data;
    });
  }

  getLastTask(): void {
    let dataReports;
    this.sub = this.service.getReports().subscribe(
         data => {
           dataReports = data.filter(item => item.owner.id === this.currentUser.id) as Report[];
           let item = dataReports[dataReports.length - 1] as Report;
           this.lastTask = item.toDoList;
           console.log(this.currentUser);
           console.log(item.toDoList);
         });
  }
}
