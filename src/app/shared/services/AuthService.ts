import {Injectable, provide} from 'angular2/core';

export interface IAuthService {
  login(user: string): boolean;
  logout(): void;
  getUser(): any;
  isLogged(): boolean;
}

@Injectable()
export class AuthService implements IAuthService {
  login(user: string): boolean {
    let isValid = user.length > 0;
    if (isValid) {
      localStorage.setItem('username', user);
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
