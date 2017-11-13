import { Component, OnInit } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { Update } from '../../models/update.model';
import { ActivatedRoute, Route, Params } from '@angular/router';

export const SHOW_MORE = 10;

@Component({
  selector: 'app-list-updates',
  templateUrl: './list-updates.component.html',
  styleUrls: ['./list-updates.component.css']
})

export class ListUpdatesComponent implements OnInit {

  updates: Update[];
  editUpdateVar: Update;

  constructor(private updateService: UpdatesDataService,
              private route: ActivatedRoute) { }

  get(params?: Params): void {
    this.updateService
      .getBy(params)
        .subscribe(items => {
          this.updates = items;
    });
  }

  editUpdate(item: Update) {
    this.editUpdateVar = item;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.updateService
      .getBy(params)
        .subscribe(items => {
          this.updates = items;
       });
      });
  }
}
