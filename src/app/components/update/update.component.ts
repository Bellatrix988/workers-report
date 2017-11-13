import { Component, OnInit, Input } from '@angular/core';
import { Update } from '../../models/update.model';
import { UpdatesDataService } from '../../services/updates-data.service';
import { UpdateDisplay } from '../../models/update-display.model';

@Component({
  selector: 'update-view',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent extends UpdateDisplay implements OnInit  {

  public _update: Update;

  constructor(private service: UpdatesDataService)  { super(service); }

  public delete(item: Update): void {
    console.log(item);
    super.delete(item);
  }

  @Input()

  set update(update: Update) {
    this._update = update;
  }
  get update(): Update { return this._update; }

  ngOnInit() {
  }

}
