import {Injectable, provide, bind} from 'angular2/core';
import {Http, Headers, Response } from 'angular2/http';
import {GlobalService} from './GlobalService';

export interface IAuthService {
  login(user: string): boolean;
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
      localStorage.setItem('username', user);
      this.http.get(this.globalService.URL_SAVE_LOGGEDUSER(user))
        .map(res => {
          return res.json;
        });
    }
    return isValid;
  }

  logout() {
    localStorage.removeItem('username');
    return false; // for the click handler not to reload whole page
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

// export let authServiceInjectables: Array<any> = [
//   bind(AuthService).toClass(AuthService)
// ];
