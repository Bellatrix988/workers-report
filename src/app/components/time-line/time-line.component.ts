import { Component, OnInit } from '@angular/core';
import { TimeObj } from '../../models/time-line-data.model';

@Component({
  selector: 'time-line-component',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})

export class TimeLineComponent implements OnInit {

  public timeLineData: TimeObj[];
//export const ONE_DAY = 86400000;
  // public cur
  constructor() { }

  public clickOnDate(item: TimeObj): void {
    console.log(item.date);
  }

  ngOnInit() {
    this.timeLineData = [
      { id: 1, date: new Date(2017, 10, 9) },
      { id: 2, date: new Date(2017, 10, 10) },
      { id: 3, date: new Date(2017, 10, 13) },
      { id: 4, date: new Date(2017, 10, 14) },
      { id: 5, date: new Date(2017, 10, 15) }
    ];
  }



}
