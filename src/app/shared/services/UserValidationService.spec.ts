import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';
import {Observable} from 'rxjs/Rx';

import {UserValidationService} from './UserValidationService';
import {GlobalService} from './GlobalService';
import {User} from '../models/User';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../enums/UserSettingsEnums';
import {ValidationResponse} from '../../shared/models/ValidationResponse';

describe('UserValidationServiceTests', () => {
  function getValidUser() {
    var user = new User();
    user.name = 'testName';
    user.profileImg = 'someProfileImage';
    user.userSettings.backgroundColor = 1;
    user.userSettings.pointerColor = 1;
    user.userSettings.pointerSize = 0;
    user.userSettings.pointerType = 1;
    return user;
  }

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    GlobalService,
    UserValidationService
  ]);

  it('should have http', inject([UserValidationService], (instance) => {
    expect(!!instance.http).toEqual(true);
  }));

  it('isValid_givenDefaultProfilePicture_shouldReturnInvalidUserPictureValidationResponse',
    inject([UserValidationService], (instance) => {
      // Arrange
      let user: User = getValidUser();
      user.profileImg = './assets/images/avatars/default.jpg';
      spyOn(instance, 'isUserPictureSet').and.callFake(() => { return false; });
      spyOn(instance, 'getInvalidUserPictureValidationResponse').and.callFake(() => { });

      // Act
      var result = instance.isValid(user);

      // Assert
      expect(instance.getInvalidUserPictureValidationResponse).toHaveBeenCalled();
    }));

  it('isValid_givenInvalidUserData_shouldReturnInvalidUserDataValidationResponse',
    inject([UserValidationService], (instance) => {
      // Arrange
      let user: User = getValidUser();
      spyOn(instance, 'isUserPictureSet').and.callFake(() => { return true; });
      spyOn(instance, 'isValidUserData').and.callFake(() => { return false; });
      spyOn(instance, 'getInvalidUserDataValidationResponse').and.callFake(() => { });

      // Act
      var result = instance.isValid(user);

      // Assert
      expect(instance.getInvalidUserDataValidationResponse).toHaveBeenCalled();
    }));

  it('isValid_givenValidUserData_shouldCheckIfUserAlreadyExists',
    inject([UserValidationService], (instance) => {
      // Arrange
      let user: User = getValidUser();
      spyOn(instance, 'isUserPictureSet').and.callFake(() => { return true; });
      spyOn(instance, 'isValidUserData').and.callFake(() => { return true; });
      spyOn(instance, 'getExistingUserValidationResponse').and.callFake(() => { });

      // Act
      var result = instance.isValid(user);

      // Assert
      expect(instance.getExistingUserValidationResponse).toHaveBeenCalledWith(user.name);
    }));

  it('isValidUserData_givenValidUserData_shouldBeTruthy',
    inject([UserValidationService], (instance) => {
      // Arrange
      var user: User = getValidUser();

      // Act
      var result = instance.isValidUserData(user);

      // Assert
      expect(result).toBeTruthy();
    }));

  it('isValidUserData_givenInvalidUserData_shouldBeFalsy',
    inject([UserValidationService], (instance) => {
      // Arrange
      var user: User = getValidUser();
      user.profileImg = null;

      // Act
      var result = instance.isValidUserData(user);

      // Assert
      expect(result).toBeFalsy();
    }));

  it('getInvalidUserPictureValidationResponse_givenInvalidUserPicture_shouldReturnInvalidUserDataValidationResponse',
    inject([UserValidationService], (instance) => {
      // Arrange
      var expectedResponse = new ValidationResponse(false, 'За да креирате профил, ве молам изберете слика.');
      var result: ValidationResponse;

      // Act
      instance.getInvalidUserPictureValidationResponse().subscribe(data => { result = data; });

      // Assert
      expect(result).toEqual(expectedResponse);
    }));

  it('getInvalidUserDataValidationResponse_givenInvalidUserData_shouldReturnInvalidUserDataValidationResponse',
    inject([UserValidationService], (instance) => {
      // Arrange
      var expectedResponse = new ValidationResponse(false, 'Не се сите полиња пополнети.');
      var result: ValidationResponse;
      // Act

      instance.getInvalidUserDataValidationResponse().subscribe(data => { result = data; });

      // Assert
      expect(result).toEqual(expectedResponse);
    }));

  it('getExistingUserValidationResponse_givenValidUser_shouldReturnNotExistingUserValidationResponse',
    inject([UserValidationService, MockBackend], (instance, mockBackend) => {
      // Arrange
      var userAlreadyExists = false;
      var responseExpected = new ValidationResponse(!userAlreadyExists);
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userAlreadyExists)
            })));
        });

      // Act
      instance.getExistingUserValidationResponse('username').subscribe(
        (data) => {
          // Assert
          expect(data).toEqual(responseExpected);
        });
    }));

  it('getExistingUserValidationResponse_givenInvalidUser_shouldReturnExistingUserValidationResponse',
    inject([UserValidationService, MockBackend], (instance, mockBackend) => {
      // Arrange
      var userAlreadyExists = true;
      var responseExpected = new ValidationResponse(!userAlreadyExists, 'Корисничкото име веќе постои, обидете се да се регистрирате со друго име.');
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userAlreadyExists)
            })));
        });

      // Act
      instance.getExistingUserValidationResponse('username').subscribe(
        (data) => {
          // Assert
          expect(data).toEqual(responseExpected);
        });
    }));
});
