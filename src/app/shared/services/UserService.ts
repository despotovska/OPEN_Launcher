import {Injectable, bind} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {Users, User} from '../models/User';
import {GlobalService} from './GlobalService';

export interface IUserService {
  getAllUsers(): Observable<User[]>;
  getUserByName(name: string): Observable<User[]>;
  addUser(user: User): Observable<User[]>;
  deleteUser(name): Observable<User[]>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(private http: Http, private globalService: GlobalService) { }

  //Get all users from db
  getAllUsers(): Observable<User[]> {
    return this.http.get(this.globalService.URL_GETALLUSERS)
      .map(res => {
        var response = new Users(res.json());
        return response.users;
      });
  }

  //Get user filtered by name from db
  getUserByName(name: string): Observable<User[]> {
    return this.http.get(this.globalService.URL_GETUSER(name))
      .map(res => {
        var response = new Users(res.json());
        return response.users;
      });
  }

  //Add new user to db
  addUser(user: User): Observable<User[]> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.globalService.URL_ADDUSER,
      JSON.stringify(user),
      { headers: headers })
      .map(res => {
        var response = new Users(res.json());
        return response.users;
      });
  }

  //Delete user by name from db
  deleteUser(name): Observable<User[]> {
    return this.http.get(this.globalService.URL_DELETEUSER(name))
      .map(res => {
        var response = new Users(res.json());
        return response.users;
      });
  }
}

export var userServiceInjectables: Array<any> = [
  bind(UserService).toClass(UserService)
];
