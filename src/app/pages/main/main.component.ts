import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdatesDataService } from '../../services/updates-data.service';
import { Update } from '../../models/update.model';
import { ActivatedRoute, Route, Params } from '@angular/router';

import { UpdateFormComponent } from '../../components/update-form/update-form.component';

export const SHOW_MORE = 10;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public updates: Update[];
  public flagHiddenForm: boolean;

  @ViewChild(UpdateFormComponent) child: UpdateFormComponent;

  constructor(private updateService?: UpdatesDataService,
              private route?: ActivatedRoute) { }

  ngOnInit() {
    this.get();
    this.flagHiddenForm = true;
  }

  public onHiddenForm(value: boolean): void {
    this.flagHiddenForm = value;
  }

  public add(): void {
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

  public setItemForm(item: Update): void {
    this.child.update = item;
    this.flagHiddenForm = false;
  }
}
