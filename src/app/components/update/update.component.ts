import { Component, OnInit, Input } from '@angular/core';
import { Update } from '../../models/update.model';
import { UpdatesDataService } from '../../services/updates-data.service';

@Component({
  selector: 'update-view',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit  {

  public _update: Update;

  constructor(private service: UpdatesDataService)  { }

  @Input() update: Update;

  // set update(update: Update) {
  //   this._update = update;
  // }
  // get update(): Update { return this._update; }

  ngOnInit() {
  }

}
