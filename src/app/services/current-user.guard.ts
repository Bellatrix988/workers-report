import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CurrentUserService } from './current-user.service';

@Injectable()
export class CurrentUserGuard implements CanActivate {

  constructor(private userService: CurrentUserService) {}

  canActivate() {
    console.log('canActivate');
    return  Observable.create((observer: Observer<Boolean>) => {
      this.userService.load()
        .subscribe(
          user => {
            console.log('User', user);
            observer.next(true);
            observer.complete();
          },
          error => {
            observer.error(false);
          }
        );
    });
  }
}
