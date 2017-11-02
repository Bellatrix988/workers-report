import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Tab } from '../../models/tab.model';

@Component({
  selector: 'app-tabs-navigate',
  templateUrl: './tabs-navigate.component.html',
  styleUrls: ['./tabs-navigate.component.css']
})
export class TabsNavigateComponent implements OnInit {

  private currentPath: string;
  tabs: Tab[];
  constructor(private router: Router,
              private location: Location) { }

  onActive(tab?: Tab) {
    this.tabs.forEach(item => item.active = item.path == this.currentPath);
    // tab.active = true;
  }

  ngOnInit() {
    this.currentPath = this.location.path();
    this.tabs = [{ id: 1, title: 'Add', path: '/create', active: false },
                 { id: 2, title: 'All', path: '/index', active: true },
                 { id: 3, title: 'My', path: '/my', active: false }];
    this.onActive();
  }
}
