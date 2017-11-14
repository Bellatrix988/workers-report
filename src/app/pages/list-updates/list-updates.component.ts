import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { Update } from '../../models/update.model';
import { ActivatedRoute, Route, Params } from '@angular/router';

import { UpdateFormComponent } from '../../components/update-form/update-form.component';

export const SHOW_MORE = 10;

@Component({
  selector: 'app-list-updates',
  templateUrl: './list-updates.component.html',
  styleUrls: ['./list-updates.component.css']
})

export class ListUpdatesComponent implements OnInit {


  updates: Update[];
  itemForm: Update;
  flagHiddenForm: boolean;
  changedModel: boolean;

  @ViewChild(UpdateFormComponent) child: UpdateFormComponent;

  constructor(private updateService?: UpdatesDataService,
              private route?: ActivatedRoute) { }


  public delete(item: Update): void {
    this.updateService
      .delete(item)
        .subscribe(
          successful => {
            this.child.refreshForm();
            this.get();
          },
          error => console.log(error)
        );
  }
  public onHiddenForm(value: boolean): void {
    this.flagHiddenForm = value;
  }

  public add() {
    this.child.refreshForm();
    this.flagHiddenForm = false;
  }

  public get(): void {
    this.route.params.subscribe((params: Params) => {
      this.updateService
      .getBy(params)
        .subscribe(items => {
          this.updates = items;
       });
    });
  }

  editUpdate(item: Update) {
    this.child.update = item;
    this.flagHiddenForm = false;
  }

  ngOnInit() {
    this.get();
    this.flagHiddenForm = false;
  }
}
