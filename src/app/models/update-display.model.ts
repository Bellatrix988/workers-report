import { Update } from './update.model';
import { Component, Input } from '@angular/core';
import { UpdatesDataService } from '../services/updates-data.service';

export class UpdateDisplay {

  public update: Update;

  constructor(private updateService: UpdatesDataService) { }

  public delete(item: Update): void {
    console.log(this.updateService);
    this.updateService
      .delete(item)
        .subscribe(
          successful => {
            // this.getListUpdates();
          },
          error => console.log(error)
        );
  }

}
