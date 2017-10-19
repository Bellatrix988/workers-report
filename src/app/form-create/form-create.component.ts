import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {

  // private userUrl = 'api/me';
  name = 'Maria';
  lastTask = ['last item1','last item2'];
  constructor() { }

  ngOnInit() {
  }

  getLastTask(): string[] {
    return;
  }
}
