import { Component, OnInit } from '@angular/core';
import { UpdatesDataService } from './../../services/updates-data.service';
import { Update } from './../../models/update.model';

@Component({
  selector: 'app-updates-list-currentuser',
  // templateUrl: './updates-list-currentuser.component.html',
  templateUrl: './../list-updates/list-updates.component.html',
  styleUrls: ['./updates-list-currentuser.component.css',
              './../list-updates/list-updates.component.css']
})
export class UpdatesListCurrentUserComponent implements OnInit {

  updates: Update[];
  constructor(private service: UpdatesDataService) { }

  ngOnInit() {
    this.updates = [];
    this.updates.push(this.service.lastUpdate);
  }

}
