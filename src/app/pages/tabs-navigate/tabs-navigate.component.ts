import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from '../../models/tab';

@Component({
  selector: 'app-tabs-navigate',
  templateUrl: './tabs-navigate.component.html',
  styleUrls: ['./tabs-navigate.component.css']
})
export class TabsNavigateComponent implements OnInit {

  tabs: Tab[];
  constructor(private router: Router) { }

  onActive(tab?: Tab) {
    this.tabs.forEach(item => item.active = false);
    tab.active = true;
  }

  ngOnInit() {
    console.log(this.router.url);
    this.tabs = [{ id: 1, title: 'Add', path: '/create', active: false },
                 { id: 2, title: 'All', path: '/index', active: true },
                 { id: 3, title: 'My', path: '/index', active: false },
                 { id: 4, title: 'Bla', path: '/index', active: false }];
  }
}
