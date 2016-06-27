import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Router} from 'angular2/router';

import {AuthService} from './app/shared/services/AuthService';

import {AuthServiceMock} from './app/shared/mocks/AuthServiceMock';
import {RouterMock} from './app/shared/mocks/RouterMock';
import {App} from './app.ts';

describe('appComponentTests', () => {
  beforeEachProviders(() => [
    provide(AuthService, { useClass: AuthServiceMock }),
    provide(Router, { useClass: RouterMock }),
    App
  ]);

  it('isUserLogged_givenAvailableAuthService_shouldBeTruthy',
    inject([App], (instance) => {
      // Arrange
      spyOn(instance.authService, 'isLogged').and.callFake(() => { return true; });

      // Act
      let result = instance.isUserLogged();

      // Assert
      expect(result).toBeTruthy();
      expect(instance.authService.isLogged).toHaveBeenCalled();
    }));

  it('logout_givenAvailableAuthService_shouldRedirectToLogin',
    inject([App], (instance) => {
      // Arrange
      let usernameKey = 'username';
      spyOn(instance.authService, 'logout').and.callFake(() => { return Observable.of(true); });
      spyOn(instance.router, 'navigate').and.callFake(() => { });

      // Act
      instance.logout();

      // Assert
      expect(instance.authService.logout).toHaveBeenCalled();
      expect(instance.router.navigate).toHaveBeenCalledWith(['/Login']);
    }));
});
