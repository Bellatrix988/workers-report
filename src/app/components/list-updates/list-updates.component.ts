import { Component, OnInit } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { Update } from '../../models/update.model';
import { ActivatedRoute, Route, Params } from '@angular/router';
import { FormCreateComponent } from '../../components/form-create/form-create.component';

export const SHOW_MORE = 10;

@Component({
  selector: 'app-list-updates',
  templateUrl: './list-updates.component.html',
  styleUrls: ['./list-updates.component.css']
})

export class ListUpdatesComponent implements OnInit {

  updates: Update[];
  flagBtnShow: boolean;
  flagShowDetail: boolean;
  editUpdateVar: Update;

  private allUpdates: Update[];

  constructor(private updateService: UpdatesDataService,
              private route: ActivatedRoute) { }


  getTemplate() {}

  getListUpdates(): void {
    // Get params from route, set these params to query.
    const id = this.route.snapshot.paramMap.get('id');
    let params;
    if (!!id) {
      params = [{'key': 'owner.id', 'value': `${id}`}];
    } else {
      params = null;
    }
    this.updateService
      .getBy(params)
        .subscribe(items => {
          this.updates = items;
      });
  }

  showUpdates() {
    let len = this.updates.length;
    this.updates = this.updates.concat(this.allUpdates.slice(len, len + SHOW_MORE));
    len = this.updates.length;
    this.flagBtnShow = len === this.allUpdates.length;
  }

  showDetail() {
    this.flagShowDetail = !this.flagShowDetail;
  }

  editUpdate(item: Update) {
    this.editUpdateVar = item;
  }

  deleteUpdate(item) {
    this.updateService
      .deleteUpdate(item)
        .subscribe(
          successful => {
            this.getListUpdates();
          },
          error => console.log(error)
        );
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.getListUpdates();
      });
  }
}
