import {Injectable, provide} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';

export interface IAuthService {
  login(user: string): Observable<boolean>;
  logout(): Observable<boolean>;
  getUser(): any;
  isLogged(): boolean;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private http: Http, private globalService: GlobalService) { }

  login(user: string): Observable<boolean> {
    if (user.length <= 0) {
      return Observable.of(false);
    }

    return this.http.get(this.globalService.URL_LOGIN(user))
      .map((res: Response) => <boolean>res.json());
  }

  logout(): Observable<boolean> {
    return this.http.get(this.globalService.URL_LOGOUT)
      .map((res: Response) => <boolean>res.json());
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
