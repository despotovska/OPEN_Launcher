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
import {PointerType, PointerSize, PointerColor, BackgroundColor, DeviceTypes} from '../../shared/enums/UserSettingsEnums';
import {UserSettings} from '../models/UserSettings';

describe('UserSettingsServiceTests', () => {
  function getDefaultUserSettingsObject() {
    return new UserSettings(
      PointerType.Hand,
      PointerSize.Small,
      PointerColor.White,
      BackgroundColor.InColor,
      DeviceTypes.Mouse);
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

  it('should have http', inject([UserSettingsService], (instance) => {
    expect(!!instance.http).toEqual(true);
  }));

  it('getUserSettingsFor_givenValidUsername_shouldRetrievedDataFromTheHttpResponse',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
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
      instance.getUserSettingsFor('username').subscribe(
        (data) => {
          // Assert
          expect(data.pointerSize).toBe(PointerSize.Small);
          expect(data.pointerType).toBe(PointerType.Hand);
          expect(data.pointerColor).toBe(PointerColor.White);
          expect(data.backgroundColor).toBe(BackgroundColor.InColor);
          expect(data.deviceType).toBe(DeviceTypes.Mouse);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('saveUserSettingsForUser_givenValidUsernameAndUserSettings_shouldRetrievedDataFromTheHttpResponse',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
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
      instance.saveUserSettingsForUser('username', userSettingsObject).subscribe(
        (data) => {
          // Assert
          expect(data.pointerSize).toBe(PointerSize.Small);
          expect(data.pointerType).toBe(PointerType.Hand);
          expect(data.pointerColor).toBe(PointerColor.White);
          expect(data.backgroundColor).toBe(BackgroundColor.InColor);
          expect(data.deviceType).toBe(DeviceTypes.Mouse);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForJar_givenInColorBgAndSmallWhitePointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = getDefaultUserSettingsObject();
      let userSettingsForJar: string = ' -bw false -ps s -pc white';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      instance.getUserSettingsForJar('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForJar);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenSmallWhitePointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = getDefaultUserSettingsObject();
      let userSettingsForElectron: string = ' s white';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      instance.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('mapPointerSize_givenSmallPointer_shouldReturnS',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
      // Arrange
      let expected = 's';

      // Act
      let result = instance.mapPointerSize(PointerSize.Small);

      // Assert
      expect(result).toBe(expected);
    }));

  it('mapPointerSize_givenMediumPointer_shouldReturnM',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
      // Arrange
      let expected = 'm';

      // Act
      let result = instance.mapPointerSize(PointerSize.Medium);

      // Assert
      expect(result).toBe(expected);
    }));

  it('mapPointerColor_givenWhitePointer_shouldReturnWhite',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
      // Arrange
      let expected = 'white';

      // Act
      let result = instance.mapPointerColor(PointerColor.White);

      // Assert
      expect(result).toBe(expected);
    }));

  it('mapPointerColor_givenYellowPointer_shouldReturnYellow',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
      // Arrange
      let expected = 'yellow';

      // Act
      let result = instance.mapPointerColor(PointerColor.Yellow);

      // Assert
      expect(result).toBe(expected);
    }));

  it('mapPointerColor_givenGreenPointer_shouldReturnGreen',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
      // Arrange
      let expected = 'green';

      // Act
      let result = instance.mapPointerColor(PointerColor.Green);

      // Assert
      expect(result).toBe(expected);
    }));

  it('mapPointerColor_givenBluePointer_shouldReturnBlue',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
      // Arrange
      let expected = 'blue';

      // Act
      let result = instance.mapPointerColor(PointerColor.Blue);

      // Assert
      expect(result).toBe(expected);
    }));

      it('mapPointerColor_givenRedPointer_shouldReturnRed',
    inject([UserSettingsService, MockBackend], (instance: UserSettingsService, mockBackend) => {
      // Arrange
      let expected = 'red';

      // Act
      let result = instance.mapPointerColor(PointerColor.Red);

      // Assert
      expect(result).toBe(expected);
    }));
});
