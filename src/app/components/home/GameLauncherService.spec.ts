import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {GameLauncherService} from './GameLauncherService';
import {GlobalService} from '../../shared/services/GlobalService';

describe('GameLauncherServiceTests', () => {
  beforeEachProviders(() => [BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend, defaultOptions) => {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    GlobalService,
    GameLauncherService
  ]);

  it('should have http', inject([GameLauncherService], (instance) => {
    expect(!!instance.http).toEqual(true);
  }));

  it('isGameStarted_givenResponsiveHTTP_shouldCallApiIsGameStarted',
    inject([GameLauncherService, MockBackend], (instance, mockBackend) => {
      // Arrange
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(true)
            })));
        });

      // Act
      instance.isGameStarted().subscribe(
        (data) => {
          // Assert
          expect(data).toBeTruthy();
        },
        (error) => {
          fail(error);
        }
      );
    }));
});
