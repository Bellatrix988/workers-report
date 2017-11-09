import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Tab } from '../../models/tab.model';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-tabs-navigate',
  templateUrl: './tabs-navigate.component.html',
  styleUrls: ['./tabs-navigate.component.css']
})
export class TabsNavigateComponent implements OnInit {

  private currentPath: string;
  tabs: Tab[];
  public users: User[];
  public customUser: number;
  private url = '/index/';

  constructor(private router: Router,
              private location: Location,
              private service: UsersService) { }

  onActive(tab?: Tab) {
    this.tabs.forEach(item => item.active = false);
    tab.active = true;
  }

  onChange() {
    this.tabs[2].path = this.url + `${this.customUser}`;
    console.log(this.tabs[2].path);
  }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(
        items =>  this.users = items
      );
    this.customUser = 1;
    this.currentPath = this.location.path();
    this.tabs = [{ id: 2, title: 'All', path: '/index', active: true },
                 { id: 3, title: 'My', path: '/index/my', active: false },
                 { id: 1, title: 'Custom',
                   path: '/index/' + `${this.customUser}`,
                   active: false }
                ] as Tab[];
    this.tabs.forEach(item => item.active = item.path === this.currentPath);
  }
}
