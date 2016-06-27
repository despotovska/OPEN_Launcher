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
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
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

  it('getUserSettingsForJar_givenBigWhitePointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
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

  it('getUserSettingsForJar_givenBWBgAndBigBluePointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Medium,
        PointerColor.Blue,
        BackgroundColor.BlackAndWhite,
        DeviceTypes.Mouse);
      let userSettingsForJar: string = ' -bw true -ps m -pc blue';

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

  it('getUserSettingsForElectron_givenSmallWhitePointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = getDefaultUserSettingsObject();
      let userSettingsForElectron: string = ' s w';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenBigWhitePointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Medium,
        PointerColor.White,
        BackgroundColor.InColor,
        DeviceTypes.Mouse);
      let userSettingsForElectron: string = ' b w';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenSmallGreenPointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Small,
        PointerColor.Green,
        BackgroundColor.InColor,
        DeviceTypes.Mouse);
      let userSettingsForElectron: string = ' s g';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenBigGreenPointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Medium,
        PointerColor.Green,
        BackgroundColor.InColor,
        DeviceTypes.Mouse);
      let userSettingsForElectron: string = ' b g';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenSmallBluePointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Small,
        PointerColor.Blue,
        BackgroundColor.InColor,
        DeviceTypes.Mouse);
      let userSettingsForElectron: string = ' s b';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenBigBluePointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Medium,
        PointerColor.Blue,
        BackgroundColor.InColor,
        DeviceTypes.Mouse);
      let userSettingsForElectron: string = ' b b';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenSmallRedPointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Small,
        PointerColor.Red,
        BackgroundColor.InColor,
        DeviceTypes.Mouse);
      let userSettingsForElectron: string = ' s r';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenBigRedPointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Medium,
        PointerColor.Red,
        BackgroundColor.InColor,
        DeviceTypes.Mouse);
      let userSettingsForElectron: string = ' b r';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenSmallYellowPointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Small,
        PointerColor.Yellow,
        BackgroundColor.InColor,
        DeviceTypes.Mouse);
      let userSettingsForElectron: string = ' s y';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getUserSettingsForElectron_givenBigYellowPointer_shouldReturnMappedUserSettings',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      // Arrange
      let userSettingsObject = new UserSettings(
        PointerType.Hand,
        PointerSize.Medium,
        PointerColor.Yellow,
        BackgroundColor.InColor,
        DeviceTypes.Mouse);
      let userSettingsForElectron: string = ' b y';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            })));
        });

      // Act
      userSettingsService.getUserSettingsForElectron('username').subscribe(
        (data) => {
          // Assert
          expect(data).toBe(userSettingsForElectron);
        },
        (error) => {
          fail(error);
        }
      );
    }));
});
