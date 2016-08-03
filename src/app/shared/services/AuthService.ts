import {Injectable, provide} from 'angular2/core';
import {Router, ComponentInstruction} from 'angular2/router';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {appInjector} from '../../../appInjector';

import {GlobalService} from './GlobalService';

export interface IAuthService {
  login(user: string): Observable<boolean>;
  logout(): Observable<boolean>;
  isLogged(): boolean;
  getLoggedUser(): string;
}

@Injectable()
export class AuthService implements IAuthService {
  private loggedUser: string;

  constructor(private http: Http, private globalService: GlobalService) { }

  login(user: string): Observable<boolean> {
    if (user.length <= 0) {
      return Observable.of(false);
    }

    return this.http.get(this.globalService.URL_LOGIN(user))
      .map((res: Response) => {
        let success = <boolean>res.json();
        if (success) {
          this.loggedUser = user;
        }
        return success;
      });
  }

  logout(): Observable<boolean> {
    return this.http.get(this.globalService.URL_LOGOUT)
      .map((res: Response) => {
        let success = <boolean>res.json();
        if (success) {
          this.loggedUser = undefined;
        }
        return success;
      });
  }

  getLoggedUser(): string {
    return this.loggedUser;
  }

  isLogged(): boolean {
    return !!this.loggedUser;
  }
}

export const isLoggedIn = (next: ComponentInstruction, previous: ComponentInstruction) => {
  let injector: any = appInjector(); // get the stored reference to the injector
  let authService: AuthService = injector.get(AuthService);
  let router: Router = injector.get(Router);
  let isLogged = authService.isLogged();

  if (!isLogged) {
    router.navigate(['/Login']);
  }
  return isLogged;
};

export let AUTH_PROVIDERS: Array<any> = [
  provide(AuthService, { useClass: AuthService })
];
