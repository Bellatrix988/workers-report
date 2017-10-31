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
  flagBtnShow: boolean;
  flagShowDetail: boolean;

  private allUpdates: Update[];
  private showMore: number;

  constructor(private UpdateService: UpdatesDataService ) { }

  getListUpdates(): void {
    this.UpdateService.getUpdates()
                      .subscribe(items => {
                        this.allUpdates = items;
                        this.showUpdates()});
  }

  showUpdates() {
    let len = this.updates.length;
    this.updates = this.updates.concat(this.allUpdates.slice(len, len + this.showMore));
    len = this.updates.length;
    this.flagBtnShow = len == this.allUpdates.length;
  }

  showDetail() {
    console.log(this.flagShowDetail);
    this.flagShowDetail = !this.flagShowDetail;
  }

  ngOnInit() {
    this.getListUpdates();
    this.updates = [];
    this.showMore = 10;
  }

}
