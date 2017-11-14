import { Component, OnInit } from '@angular/core';
import { TimeObj } from '../../models/time-line-data.model';

@Component({
  selector: 'time-line-component',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {

  public timeLineData: TimeObj[];

  constructor() { }

  public clickOnDate(item: TimeObj): void {
    console.log(item.id);
  }

  ngOnInit() {
    this.timeLineData = [
      { id: 1, date: new Date() },
      { id: 2, date: new Date() },
      { id: 3, date: new Date() },
      { id: 4, date: new Date() },
      { id: 5, date: new Date() }
    ];
  }



}
