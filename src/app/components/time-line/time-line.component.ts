import { Component, OnInit, Input} from '@angular/core';
import { Update } from '../../models/update.model';

@Component({
  selector: 'time-line-component',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})

export class TimeLineComponent implements OnInit {

  @Input() data: Update[];

  constructor() { }

  // TODO: выбранная даты

  public setCurrentDate(): void {
    // TODO: отправление в сервис выбранной даты
  }

  ngOnInit() {

  }



}
