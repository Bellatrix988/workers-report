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
  flagHiddenForm: boolean;
  changedModel: boolean;

  constructor(private updateService?: UpdatesDataService,
              private route?: ActivatedRoute) { }


  public delete(item: Update): void {
    this.updateService
      .delete(item)
        .subscribe(
          successful => {
            this.changedModel = true;
            this.get();
          },
          error => console.log(error)
        );
  }
  public onHiddenForm(value: boolean): void {
    this.flagHiddenForm = value;
  }
  public add() {
    this.flagHiddenForm = false;
  }

  public get(): void {
    this.route.params.subscribe((params: Params) => {
      this.updateService
      .getBy(params)
        .subscribe(items => {
          this.updates = items;
          this.changedModel = false;
       });
    });
  }

  editUpdate(item: Update) {
    this.editUpdateVar = item;
    this.flagHiddenForm = false;
  }

  ngOnInit() {
    this.get();
  }
}
