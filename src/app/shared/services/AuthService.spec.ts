import {
  beforeEach,
  describe,
  expect,
  it
} from 'angular2/testing';

import {AuthService} from './AuthService';

describe('AuthServiceTests', () => {
  var instance: AuthService = null;

  beforeEach(() => {
    instance = new AuthService();
  });

  it('login_givenValidUsername_shouldBeTruthy', () => {
    // Arrange
    var usernameKey = 'username';
    var usernameValue = 'dragica';
    spyOn(localStorage, 'setItem').and.callFake(() => { });

    // Act
    var result = instance.login(usernameValue);

    // Assert
    expect(result).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(usernameKey, usernameValue);
  });

  it('login_givenInvalidUsername_shouldBeFalsy', () => {
    //Arrange
    var username = '';

    //Act
    var result = instance.login(username);

    //Assert
    expect(result).toBeFalsy();
  });

  it('logout_givenItemInLocalStorage_shouldRemoveItem', () => {
    //Arrange
    spyOn(localStorage, 'removeItem').and.callFake(() => { });

    //Act
    instance.logout();

    //Assert
    expect(localStorage.removeItem).toHaveBeenCalledWith('username');
  });

  it('getUser_givenItemInLocalStorage_shouldGetItem', () => {
    //Arrange
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return 'dragica';
    });

    //Act
    var result = instance.getUser();

    //Assert
    expect(localStorage.getItem).toHaveBeenCalledWith('username');
    expect(result).toBe('dragica');

  });

  it('isLogged_givenItemInLocalStorage_shouldBeTruthy', () => {
    //Arrange
    spyOn(localStorage, 'getItem').and.callFake(() => { });

    //Act
    var result = instance.isLogged();

    //Assert
    expect(result).toBeTruthy();
  });

  it('isLogged_givenNoItemInLocalStorage_shouldBeFalsy', () => {
    //Arrange
    spyOn(localStorage, 'getItem').and.callFake(() => { return null; });

    //Act
    var result = instance.isLogged();

    //Assert
    expect(result).toBeFalsy();
  });
});
