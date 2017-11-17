import { Component, OnInit, Input } from '@angular/core';
import { Update } from '../../models/update.model';
import { UpdatesDataService } from '../../services/updates-data.service';

@Component({
  selector: 'app-update-view',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css',
   '../../sharing/timeline.style.scss']
})

export class UpdateComponent implements OnInit  {

  public _update: Update;

  constructor(private service: UpdatesDataService)  { }

  @Input() update: Update;
  @Input() odd: number;
  @Input() even: number;

  ngOnInit() {
  }

}
