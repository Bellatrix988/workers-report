import { Component, OnInit } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { Update } from '../../models/update';

@Component({
  selector: 'app-list-updates',
  templateUrl: './list-updates.component.html',
  styleUrls: ['./list-updates.component.css']
})
export class ListUpdatesComponent implements OnInit {

  updates: Update[];

  constructor(private UpdateService: UpdatesDataService ) { }

  getListUpdates(): void {
    this.UpdateService.getUpdates()
                      .subscribe(items => this.updates = items);
  }

  ngOnInit() {
    this.getListUpdates();
  }

}
