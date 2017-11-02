import { Component, OnInit } from '@angular/core';
import { UpdatesDataService } from './../../services/updates-data.service';
import { Update } from './../../models/update.model';

@Component({
  selector: 'app-updates-list-currentuser',
  templateUrl: './../list-updates/list-updates.component.html',
  styleUrls: ['./updates-list-currentuser.component.css',
              './../list-updates/list-updates.component.css']
})
export class UpdatesListCurrentUserComponent implements OnInit {

  updates: Update[];
  flagBtnShow: Boolean = true;
  constructor(private service: UpdatesDataService) { }

  ngOnInit() {
    this.service.getDataCurrentUser()
      .subscribe(
        data =>
        this.updates = data);
  }

}
