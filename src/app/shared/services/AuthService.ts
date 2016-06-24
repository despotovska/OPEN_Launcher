import {Injectable, provide} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';

export interface IAuthService {
  login(user: string): void;
  logout(): void;
  getUser(): any;
  isLogged(): boolean;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private http: Http, private globalService: GlobalService) { }

  login(user: string): boolean {
    let isValid = user.length > 0;
    if (isValid) {
      this.http.get(this.globalService.URL_LOGIN(user));
      localStorage.setItem('username', user);
    }
    return isValid;
  }

  logout(): void {
    this.http.get(this.globalService.URL_LOGOUT);
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLogged(): boolean {
    return !!this.getUser();
  }
}

export let AUTH_PROVIDERS: Array<any> = [
  provide(AuthService, { useClass: AuthService })
];
