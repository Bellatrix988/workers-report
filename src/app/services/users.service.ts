import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

const URL = `http://localhost:3000/users`;

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http
      .get(URL)
      .map(item => item as User[]);
  }
}
