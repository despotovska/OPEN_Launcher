import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Router} from 'angular2/router';

import {LoginComponent} from './LoginComponent';
import {User} from '../../shared/models/User';
import {AuthService} from '../../shared/services/AuthService';
import {UserService} from '../../shared/services/UserService';
import {AlertingService} from '../../shared/services/AlertingService';
import {Alert} from '../../shared/models/Alert';

import {AuthServiceMock} from '../../shared/mocks/AuthServiceMock';
import {UserServiceMock} from '../../shared/mocks/UserServiceMock';
import {RouterMock} from '../../shared/mocks/RouterMock';

describe('LoginComponentTests', () => {
  beforeEachProviders(() => [
    AlertingService,
    provide(AuthService, { useClass: AuthServiceMock }),
    provide(UserService, { useClass: UserServiceMock }),
    provide(Router, { useClass: RouterMock }),
    LoginComponent
  ]);

  it('setAllUsers_givenAvailableUserService_shouldReturnAllUsers',
    inject([LoginComponent], (instance) => {
      // Arrange
      let localUsers = [{ 'name': 'user1' }, { 'name': 'user2' }];
      spyOn(instance.userService, 'getAllUsers').and.callThrough();

      // Act
      instance.setAllUsers();

      // Assert
      expect(instance.userService.getAllUsers).toHaveBeenCalled();
      expect(instance.allUsers).toEqual(localUsers);
    }));

  it('setAllUsers_givenUnavailableUserService_shouldThrowAlertForDanger',
    inject([LoginComponent], (instance) => {
      // Arrange
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      spyOn(instance.userService, 'getAllUsers').and.callFake(() => { return Observable.throw(new Error()); });

      // Act
      instance.setAllUsers();

      // Assert
      expect(instance.userService.getAllUsers).toHaveBeenCalled();
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Грешка при вчитување на корисниците.');
    }));

  it('login_givenInvalidUser_shouldSetUnsuccessfulLoginAlertMessage',
    inject([LoginComponent], (instance) => {
      // Arrange
      let user = UserServiceMock.getTestUser('user1');
      spyOn(instance.authService, 'login').and.callFake(() => { return false; });
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      spyOn(instance.router, 'navigate').and.callFake(() => { });
      instance.selectedUser = user;

      // Act
      instance.login();

      // Assert
      expect(instance.authService.login).toHaveBeenCalledWith(user.name);
      expect(instance.router.navigate).not.toHaveBeenCalledWith(['/Home']);
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Корисникот не е валиден.');
    }));

  it('login_givenValidUser_shouldRedirectToHome',
    inject([LoginComponent], (instance) => {
      // Arrange
      let user = UserServiceMock.getTestUser('user1');
      spyOn(instance.authService, 'login').and.callFake(() => { return true; });
      spyOn(instance.router, 'navigate').and.callFake(() => { });
      instance.selectedUser = user;

      // Act
      instance.login();

      // Assert
      expect(instance.authService.login).toHaveBeenCalledWith(user.name);
      expect(instance.router.navigate).toHaveBeenCalledWith(['/Home']);
    }));

  it('deleteUser_givenSelectedUser_shouldDeleteUserResetTheSelectedUserAndSetSuccessAlertMessage',
    inject([LoginComponent], (instance) => {
      // Arrange
      let user = UserServiceMock.getTestUser('user1');
      instance.selectedUser = user;
      spyOn(instance.alertingService, 'addSuccess').and.callFake(() => { });
      spyOn(instance.userService, 'deleteUser').and.callThrough();

      // Act
      instance.deleteUser();

      // Assert
      expect(instance.userService.deleteUser).toHaveBeenCalledWith(user.name);
      expect(instance.allUsers.length).toEqual(1);
      expect(instance.selectedUser).not.toEqual(user);
      expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('Профилот е успешно избришан.');
    }));

  it('deleteUser_givenUnavailableUserService_shouldThrowAlertForDanger',
    inject([LoginComponent], (instance) => {
      // Arrange
      let user = UserServiceMock.getValidUserWithSettings('user1');
      instance.selectedUser = user;
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      spyOn(instance.userService, 'deleteUser').and.callFake(() => { return Observable.throw(new Error()); });

      // Act
      instance.deleteUser();

      // Assert
      expect(instance.userService.deleteUser).toHaveBeenCalledWith(user.name);
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Грешка при бришење на профилот.');
    }));

  it('deleteCancelled_givenCancelDeletingIsChosen_shouldSetInfoAlertMessage',
    inject([LoginComponent], (instance) => {
      // Arrange
      spyOn(instance.alertingService, 'addInfo').and.callFake(() => { });

      // Act
      instance.deleteCancelled();

      // Assert
      expect(instance.alertingService.addInfo).toHaveBeenCalledWith('Бришењето е откажано.');
    }));

  it('selectUser_givenValidUser_shouldSetTheSelectedUser',
    inject([LoginComponent], (instance) => {
      // Arrange
      let user = UserServiceMock.getTestUser('user1');

      // Act
      instance.selectUser(user);

      // Assert
      expect(instance.selectedUser).toEqual(user);
    }));

  it('shouldApplySelectedUserLayout_givenSelectedUser_shouldReturnTrue',
    inject([LoginComponent], (instance) => {
      // Arrange
      let user = UserServiceMock.getTestUser('user1');
      instance.selectedUser = user;

      // Act
      let flag = instance.shouldApplySelectedUserLayout(user);

      // Assert
      expect(flag).toBeTruthy();
    }));

  it('shouldApplySelectedUserLayout_givenDifferentUser_shouldReturnFalse',
    inject([LoginComponent], (instance) => {
      // Arrange
      let selectedUser = UserServiceMock.getTestUser('user1');
      let user = UserServiceMock.getTestUser('user2');
      instance.selectedUser = selectedUser;

      // Act
      let flag = instance.shouldApplySelectedUserLayout(user);

      // Assert
      expect(flag).toBeFalsy();
    }));

  it('ngOnInit_givenLoggedInUser_shouldRouterNavigateToHome',
    inject([LoginComponent], (instance) => {
      // Arrange
      spyOn(instance.authService, 'isLogged').and.callFake(() => { return true; });
      spyOn(instance.router, 'navigate').and.callFake(() => { });

      // Act
      instance.ngOnInit();

      // Assert
      expect(instance.router.navigate).toHaveBeenCalledWith(['Home']);
    }));
});
