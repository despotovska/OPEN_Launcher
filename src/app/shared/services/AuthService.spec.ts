import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {AuthService} from './AuthService';
import {GlobalService} from './GlobalService';

describe('AuthServiceTests', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function (backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    GlobalService,
    AuthService
  ]);

  let usernameKey = 'username';

  it('should have http', inject([AuthService], (instance) => {
    expect(!!instance.http).toEqual(true);
  }));

  it('login_givenValidUsername_shouldBeTruthy',
    inject([AuthService, MockBackend], (instance: AuthService, mockBackend) => {
      // Arrange
      let usernameValue = 'dragica';
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(true)
            }
            )));
        });

      // Act
      instance.login(usernameValue).subscribe((result) => {

        // Assert
        expect(result).toBeTruthy();
      });
    }));

  it('login_givenInvalidUsername_shouldBeFalsy',
    inject([AuthService], (instance) => {
      // Arrange
      let username = '';

      // Act
      instance.login(username).subscribe(
        (result) => {

          // Assert
          expect(result).toBeFalsy();
        });
    }));

  it('logout_givenAvailableAuthService_shouldBeTruthy',
    inject([AuthService, MockBackend], (instance: AuthService, mockBackend) => {
      // Arrange
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(true)
            }
            )));
        });

      // Act
      instance.logout()
        .subscribe((result) => {

          // Assert
          expect(result).toBeTruthy();
        });
    }));

  it('getLoggedUser_givenItemInLocalStorage_shouldGetItem',
    inject([AuthService], (instance) => {
      // Arrange
      let user = 'dragica';
      instance.loggedUser = user;

      // Act
      let result = instance.getLoggedUser();

      // Assert
      expect(result).toBe(user);

    }));

  it('isLogged_givenLoggedUser_shouldBeTruthy',
    inject([AuthService], (instance) => {
      // Arrange
      instance.loggedUser = 'dragica';

      // Act
      let result = instance.isLogged();

      // Assert
      expect(result).toBeTruthy();
    }));

  it('isLogged_givenUnsetLoggedUser_shouldBeFalsy',
    inject([AuthService], (instance) => {
      // Arrange
      instance.loggedUser = '';

      // Act
      let result = instance.isLogged();

      // Assert
      expect(result).toBeFalsy();
    }));
});
