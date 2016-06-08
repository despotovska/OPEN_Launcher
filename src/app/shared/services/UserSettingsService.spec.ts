import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {UserSettingsService} from './UserSettingsService';
import {GlobalService} from './GlobalService';
import * as UserSettingsEnums from '../enums/UserSettingsEnums';
import {UserSettings} from '../models/UserSettings';

describe('UserSettingsServiceTests', () => {
  function getDefaultUserSettingsObject() {
    return getUserSettingsObject(
      UserSettingsEnums.PointerSize.Small,
      UserSettingsEnums.PointerType.Hand,
      UserSettingsEnums.PointerColor.White,
      UserSettingsEnums.BackgroundColor.InColor,
      UserSettingsEnums.DeviceTypes.Mouse
    );
  }

  function getUserSettingsObject(
    pointerSize: UserSettingsEnums.PointerSize,
    pointerType: UserSettingsEnums.PointerType,
    pointerColor: UserSettingsEnums.PointerColor,
    backgroundColor: UserSettingsEnums.BackgroundColor,
    deviceType: UserSettingsEnums.DeviceTypes
  ): UserSettings {
    let result = new UserSettings();
    result.pointerSize = pointerSize;
    result.pointerType = pointerType;
    result.pointerColor = pointerColor;
    result.backgroundColor = backgroundColor;
    result.deviceType = deviceType;
    return result;
  }

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend, defaultOptions) => {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    GlobalService,
    UserSettingsService
  ]);

  it('should have http', inject([UserSettingsService], (userSettingsService) => {
    expect(!!userSettingsService.http).toEqual(true);
  }));

  it('getUserSettingsFor_givenValidUsername_shouldRetrievedDataFromTheHttpResponse',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = getDefaultUserSettingsObject();

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsFor('username').subscribe(
        (data) => {
          // Assert
          expect(data.pointerSize).toBe(UserSettingsEnums.PointerSize.Small);
          expect(data.pointerType).toBe(UserSettingsEnums.PointerType.Hand);
          expect(data.pointerColor).toBe(UserSettingsEnums.PointerColor.White);
          expect(data.backgroundColor).toBe(UserSettingsEnums.BackgroundColor.InColor);
          expect(data.deviceType).toBe(UserSettingsEnums.DeviceTypes.Mouse);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForJar_givenValidUsername_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = getDefaultUserSettingsObject();
      let userSettingsForJar: string = ' -bw false -ps s -pc white -dt mouse';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForJar('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForJar);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('saveUserSettingsForUser_givenValidUsernameAndUserSettings_shouldRetrievedDataFromTheHttpResponse',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = getDefaultUserSettingsObject();

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.saveUserSettingsForUser('username', userSettingsObject).subscribe(
        (data) => {
          // Assert
          expect(data.pointerSize).toBe(UserSettingsEnums.PointerSize.Small);
          expect(data.pointerType).toBe(UserSettingsEnums.PointerType.Hand);
          expect(data.pointerColor).toBe(UserSettingsEnums.PointerColor.White);
          expect(data.backgroundColor).toBe(UserSettingsEnums.BackgroundColor.InColor);
          expect(data.deviceType).toBe(UserSettingsEnums.DeviceTypes.Mouse);
        },
        (error) => {
          fail(error);
        }
      );
    }));
});
