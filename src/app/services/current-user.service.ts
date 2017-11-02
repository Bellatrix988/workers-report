import { Injectable } from '@angular/core';
import { User } from './../models/user.model';

@Injectable()
export class CurrentUserService extends User {

  constructor() {
    super();
   }

}
