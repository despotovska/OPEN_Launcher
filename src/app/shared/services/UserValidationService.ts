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
    let isValid = user.profileImg
      && user.profileImg !== './assets/images/avatars/default.jpg';
    return isValid;
  }

  isValidUserData(user: User): boolean {
    let isValid = user.name
      && user.profileImg
      && user.userSettings
      && user.userSettings.backgroundColor >= 0
      && user.userSettings.pointerColor >= 0
      && user.userSettings.pointerSize >= 0
      && user.userSettings.pointerType >= 0;
    return isValid;
  }

  getInvalidUserPictureValidationResponse(): Observable<ValidationResponse> {
    let response = new ValidationResponse(false, 'SELECT_PICTURE_VALIDATION_MESSAGE');
    return Observable.of(response);
  }

  getInvalidUserDataValidationResponse(): Observable<ValidationResponse> {
    let response = new ValidationResponse(false, 'REQUIRED_FIELDS_VALIDATION_MESSAGE');
    return Observable.of(response);
  }

  getExistingUserValidationResponse(username: string): Observable<ValidationResponse> {
    return this.http.get(this.globalService.URL_IS_EXISTINGUSER(username))
      .map(res => {
        let isExisting: boolean = JSON.parse(res.json());
        let response = new ValidationResponse(!isExisting);

        if (isExisting) {
          response.message = 'EXISTING_USERNAME_VALIDATION_MESSAGE';
        }
        return response;
      });
  }
}

export let userValidationServiceInjectables: Array<any> = [
  bind(UserValidationService).toClass(UserValidationService)
];
