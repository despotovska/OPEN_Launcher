import {Injectable, bind} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs';

import {GlobalService} from './GlobalService';
import {User} from '../models/User';
import {ValidationResponse} from '../models/ValidationResponse';

export interface IUserValidationService {
  isValid(user: User): Observable<ValidationResponse>;
}

@Injectable()
export class UserValidationService implements IUserValidationService {
  constructor(private http: Http, private globalService: GlobalService) { }

  isValid(user: User): Observable<ValidationResponse> {
    if (!this.isUserPictureSet(user)) {
      return this.getInvalidUserPictureValidationResponse();
    }

    if (!this.isValidUserData(user)) {
      return this.getInvalidUserDataValidationResponse();
    }

    return this.getExistingUserValidationResponse(user.name);
  }

  isUserPictureSet(user: User): boolean {
    var isValid = user.profileImg
      && user.profileImg !== './assets/images/avatars/default.jpg';
    return isValid;
  }

  isValidUserData(user: User): boolean {
    var isValid = user.name
      && user.profileImg
      && user.userSettings
      && user.userSettings.backgroundColor >= 0
      && user.userSettings.pointerColor >= 0
      && user.userSettings.pointerSize >= 0
      && user.userSettings.pointerType >= 0;
    return isValid;
  }

  getInvalidUserPictureValidationResponse(): Observable<ValidationResponse> {
    var response = new ValidationResponse(false, 'За да креирате профил, ве молам изберете слика.');
    return Observable.of(response);
  }

  getInvalidUserDataValidationResponse(): Observable<ValidationResponse> {
    var response = new ValidationResponse(false, 'Не се сите полиња пополнети.');
    return Observable.of(response);
  }

  getExistingUserValidationResponse(username: string): Observable<ValidationResponse> {
    return this.http.get(this.globalService.URL_IS_EXISTINGUSER(username))
      .map(res => {
        var isExisting: boolean = JSON.parse(res.json());
        var response = new ValidationResponse(!isExisting);

        if (isExisting) {
          response.message = 'Корисничкото име веќе постои, обидете се да се регистрирате со друго име.';
        }
        return response;
      });
  }
}

export var userValidationServiceInjectables: Array<any> = [
  bind(UserValidationService).toClass(UserValidationService)
];
