import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide, Component} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

import {RegisterComponent} from './RegisterComponent';
import {User} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {GlobalService} from '../../shared/services/GlobalService';
import {UserService} from '../../shared/services/UserService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../../shared/services/AlertingService';
import {Alert} from '../../shared/models/Alert';
import {ValidationResponse} from '../../shared/models/ValidationResponse';

import {UserServiceMock} from '../../shared/mocks/UserServiceMock';
import {RouterMock} from '../../shared/mocks/RouterMock';
import {ImagesServiceMock} from '../../shared/mocks/ImagesServiceMock';

describe('RegisterComponentTests', () => {
  beforeEachProviders(() => [
    AlertingService,
    UserValidationService,
    provide(ImagesService, { useClass: ImagesServiceMock }),
    provide(UserService, { useClass: UserServiceMock }),
    provide(Router, { useClass: RouterMock }),
    FormBuilder,
    HTTP_PROVIDERS,
    GlobalService,
    RegisterComponent
  ]);

  it('setAvailableImages_givenImagesServiceIsAvailable_shouldReturnJSONOfImageFiles',
    inject([RegisterComponent], (instance) => {
      // Arrange
      let allImagesLocal = ['./app/assets/images/avatars/default.jpg', './app/assets/images/avatars/devojce.png'];
      spyOn(instance.imagesService, 'getProfileImages').and.callThrough();

      // Act
      instance.setAvailableImages();

      // Assert
      expect(instance.imagesService.getProfileImages).toHaveBeenCalled();
      expect(instance.allImages).toEqual(allImagesLocal);
    }));

  it('setAvailableImages_givenImagesServiceIsUnavailable_shouldShowAlertForDanger',
    inject([RegisterComponent], (instance) => {
      // Arrange
      spyOn(instance.imagesService, 'getProfileImages').and.callFake(() => { return Observable.throw(new Error()); });
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      // Act
      instance.setAvailableImages();

      // Assert
      expect(instance.imagesService.getProfileImages).toHaveBeenCalled();
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('LOAD_AVATARS_ERROR_MESSAGE');
    }));

  it('onSelect_givenSelectedImagePath_shouldSetProfileImg',
    inject([RegisterComponent], (instance) => {
      // Act
      instance.onSelect('imagePath');

      // Assert
      expect(instance.user.profileImg).toBe('imagePath');
    }));

  it('onSubmit_givenAValidNewUser_shouldValidateAddUserThrowAlertForSuccessAndRedirectToLogin',
    inject([RegisterComponent], (instance) => {
      // Arrange
      instance.user = UserServiceMock.getTestUser('user');
      spyOn(instance.userValidationService, 'isValid').and.callFake(() => {
        let response: ValidationResponse = new ValidationResponse(true, 'ADD_USER_SUCCESS_MESSAGE');
        return Observable.of(response);
      });
      spyOn(instance.userService, 'addUser').and.callFake((user) => {
        return Observable.of({ users: UserServiceMock.getAllUsers(user) });
      });
      spyOn(instance.router, 'navigate').and.callThrough();
      spyOn(instance.alertingService, 'addSuccess').and.callFake(() => { });

      // Act
      instance.onSubmit();

      // Assert
      expect(instance.userValidationService.isValid).toHaveBeenCalled();
      expect(instance.router.navigate).toHaveBeenCalledWith(['/Login']);
      expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('ADD_USER_SUCCESS_MESSAGE');
    }));

  it('onSubmit_givenInvalidUser_shouldValidateAddUserThrowAlertForDanger',
    inject([RegisterComponent], (instance) => {
      // Arrange
      instance.user = UserServiceMock.getTestUser('user');
      spyOn(instance.userValidationService, 'isValid').and.callFake(() => {
        let response: ValidationResponse = new ValidationResponse(false, 'EXISTING_USERNAME_VALIDATION_MESSAGE');
        return Observable.of(response);
      });
      spyOn(instance.userService, 'addUser').and.callFake((user) => {
        return Observable.of({ users: UserServiceMock.getAllUsers(user) });
      });
      spyOn(instance.router, 'navigate').and.callThrough();
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });

      // Act
      instance.onSubmit();

      // Assert
      expect(instance.userValidationService.isValid).toHaveBeenCalled();
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('EXISTING_USERNAME_VALIDATION_MESSAGE');
      expect(instance.router.navigate).not.toHaveBeenCalledWith(['/Login']);
    }));

  it('onSubmit_givenDefaultPicSelected_shouldNotAddAndshouldShowAlertForDanger',
    inject([RegisterComponent], (instance) => {
      // Arrange
      let user: User = UserServiceMock.getTestUser('user');
      user.profileImg = './assets/images/avatars/default.jpg';
      instance.user = user;
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      spyOn(instance.router, 'navigate').and.callThrough();
      spyOn(instance.userService, 'addUser').and.callFake(() => { });

      // Act
      instance.onSubmit();

      // Assert
      expect(instance.userService.addUser).not.toHaveBeenCalledWith(user);
      expect(instance.router.navigate).not.toHaveBeenCalledWith(['/Login']);
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('SELECT_PICTURE_VALIDATION_MESSAGE');
    }));

  it('onSubmit_givenUserServiceIsUnavailable_shouldNotAddAndshouldShowAlertForDanger',
    inject([RegisterComponent], (instance) => {
      // Arrange

      let user: User = UserServiceMock.getValidUserWithSettings('user');
      instance.user = user;
      spyOn(instance.userValidationService, 'isValid').and.callFake(() => {
        let response: ValidationResponse = new ValidationResponse(true);
        return Observable.of(response);
      });
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      spyOn(instance.userService, 'addUser').and.callFake(() => { return Observable.throw(new Error()); });

      // Act
      instance.onSubmit();

      // Assert
      expect(instance.userService.addUser).toHaveBeenCalled();
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('ADD_USER_ERROR_MESSAGE');
    }));
});
