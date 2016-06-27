import {Injectable, provide} from 'angular2/core';
import {Http, Response} from 'angular2/http';
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

export let AUTH_PROVIDERS: Array<any> = [
  provide(AuthService, { useClass: AuthService })
];
