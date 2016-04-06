import {
  it,
  inject,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {UserService} from './UserService';
import {GlobalService} from './GlobalService';
import * as UserSettingsEnums from '../enums/UserSettingsEnums';
import {UserServiceMock} from '../../shared/mocks/UserServiceMock';
import {UserSettings} from '../models/UserSettings';
import {Users, User} from '../models/User';

describe('UserServiceTests', () => {
  var instance: UserService = null;

  function getDefaultUserObject(): User[] {
    var result: User[] = new Array<User>();
    result[0] = UserServiceMock.getValidUserWithSettings('user1');
    return result;
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
    UserService
  ]);

  it('should have http', inject([UserService], (instance) => {
    expect(!!instance.http).toEqual(true);
  }));

  it('getAllUsers_givenResponsiveHTTP_shouldRetrieveDataFromTheHttpResponse',
    inject([UserService, MockBackend], (instance, mockBackend) => {
      // Arrange
      var userObject: User[] = new Array<User>();
      userObject = getDefaultUserObject();

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userObject)
            }
            )));
        });

      // Act
      instance.getAllUsers().subscribe(
        (data) => {
          // Assert
          expect(data[0].profileImg).toBe(userObject[0].profileImg);
          expect(data[0].name).toBe(userObject[0].name);
          expect(data[0].userSettings.pointerSize).toBe(userObject[0].userSettings.pointerSize);
          expect(data[0].userSettings.pointerColor).toBe(userObject[0].userSettings.pointerColor);
          expect(data[0].userSettings.pointerType).toBe(userObject[0].userSettings.pointerType);
          expect(data[0].userSettings.backgroundColor).toBe(userObject[0].userSettings.backgroundColor);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserByName_givenValidUsername_shouldRetrieveDataFromTheHttpResponse',
    inject([UserService, MockBackend], (instance, mockBackend) => {
      // Arrange
      var userObject: User[] = new Array<User>();
      userObject = getDefaultUserObject();

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userObject)
            }
            )));
        });

      // Act
      instance.getUserByName('username').subscribe(
        (data) => {
          // Assert
          expect(data[0].profileImg).toBe(userObject[0].profileImg);
          expect(data[0].name).toBe(userObject[0].name);
          expect(data[0].userSettings.pointerSize).toBe(userObject[0].userSettings.pointerSize);
          expect(data[0].userSettings.pointerColor).toBe(userObject[0].userSettings.pointerColor);
          expect(data[0].userSettings.pointerType).toBe(userObject[0].userSettings.pointerType);
          expect(data[0].userSettings.backgroundColor).toBe(userObject[0].userSettings.backgroundColor);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('addUser_givenValidUsername_shouldRetrieveDataFromTheHttpResponse',
    inject([UserService, MockBackend], (instance, mockBackend) => {
      // Arrange
      var userObject: User[] = new Array<User>();
      userObject = getDefaultUserObject();

      var user: User = new User();
      user = UserServiceMock.getValidUserWithSettings('user1');

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userObject)
            }
            )));
        });

      // Act
      instance.addUser(user).subscribe(
        (data) => {
          // Assert
          expect(data[0].profileImg).toBe(user.profileImg);
          expect(data[0].name).toBe(user.name);
          expect(data[0].userSettings.pointerSize).toBe(user.userSettings.pointerSize);
          expect(data[0].userSettings.pointerColor).toBe(user.userSettings.pointerColor);
          expect(data[0].userSettings.pointerType).toBe(user.userSettings.pointerType);
          expect(data[0].userSettings.backgroundColor).toBe(user.userSettings.backgroundColor);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('deleteUser_givenValidUsername_shouldRetrieveDataFromTheHttpResponse',
    inject([UserService, MockBackend], (instance, mockBackend) => {
      // Arrange
      var userObject: User[] = new Array<User>();
      userObject = getDefaultUserObject();

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userObject)
            }
            )));
        });

      // Act
      instance.deleteUser('username').subscribe(
        (data) => {
          // Assert
          expect(data.length).toEqual(1);
        },
        (error) => {
          fail(error);
        }
      );
    }));

});
