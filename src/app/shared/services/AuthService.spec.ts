import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';

import {AuthService} from './AuthService';

describe('AuthServiceTests', () => {
  beforeEachProviders(() => [
    AuthService
  ]);

  it('login_givenValidUsername_shouldBeTruthy', inject([AuthService], (instance) => {
    // Arrange
    var usernameKey = 'username';
    var usernameValue = 'dragica';
    spyOn(localStorage, 'setItem').and.callFake(() => { });

    // Act
    var result = instance.login(usernameValue);

    // Assert
    expect(result).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(usernameKey, usernameValue);
  }));

  it('login_givenInvalidUsername_shouldBeFalsy', inject([AuthService], (instance) => {
    //Arrange
    var username = '';

    //Act
    var result = instance.login(username);

    //Assert
    expect(result).toBeFalsy();
  }));

  it('logout_givenItemInLocalStorage_shouldRemoveItem', inject([AuthService], (instance) => {
    //Arrange
    spyOn(localStorage, 'removeItem').and.callFake(() => { });

    //Act
    instance.logout();

    //Assert
    expect(localStorage.removeItem).toHaveBeenCalledWith('username');
  }));

  it('getUser_givenItemInLocalStorage_shouldGetItem', inject([AuthService], (instance) => {
    //Arrange
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return 'dragica';
    });

    //Act
    var result = instance.getUser();

    //Assert
    expect(localStorage.getItem).toHaveBeenCalledWith('username');
    expect(result).toBe('dragica');

  }));

  it('isLogged_givenItemInLocalStorage_shouldBeTruthy', inject([AuthService], (instance) => {
    //Arrange
    spyOn(localStorage, 'getItem').and.callFake(() => { });

    //Act
    var result = instance.isLogged();

    //Assert
    expect(result).toBeTruthy();
  }));

  it('isLogged_givenNoItemInLocalStorage_shouldBeFalsy', inject([AuthService], (instance) => {
    //Arrange
    spyOn(localStorage, 'getItem').and.callFake(() => { return null; });

    //Act
    var result = instance.isLogged();

    //Assert
    expect(result).toBeFalsy();
  }));
});
