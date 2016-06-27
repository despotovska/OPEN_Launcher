import {Observable} from 'rxjs/Rx';

import {IAuthService} from '../services/AuthService';
import {User} from '../models/User';

export class AuthServiceMock implements IAuthService {
  login(username: string): Observable<boolean> {
    return Observable.of(true);
  }

  logout(): Observable<boolean> {
    return Observable.of(true);
  }

  getLoggedUser(): string {
    return 'userName';
  }

  isLogged(): boolean {
    return true;
  }
}
