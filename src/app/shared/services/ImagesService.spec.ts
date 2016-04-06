import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {ImagesService} from './ImagesService';
import {GlobalService} from './GlobalService';

describe('ImagesServiceTests', () => {
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
    ImagesService
  ]);

  it('should have http', inject([ImagesService], (instance) => {
    expect(!!instance.http).toEqual(true);
  }));

  it('getProfileImages_givenAvailableHTTP_shouldReturnJSONProfileImages',
    inject([ImagesService, MockBackend], (instance: ImagesService, mockBackend) => {
      // Arrange
      var profileImages = ['./app/assets/images/avatars/default.jpg', './app/assets/images/avatars/devojce.png'];
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(profileImages)
            })));
        });

      // Act
      instance.getProfileImages().subscribe(
        (data) => {
          // Assert
          expect(data).toEqual(profileImages);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('getPointerImages_givenAvailableHTTP_shouldReturnJSONPointerImages',
    inject([ImagesService, MockBackend], (instance: ImagesService, mockBackend) => {
      // Arrange
      var pointerImages = ['./app/assets/images/pointer/small.png', './app/assets/images/pointer/big.png'];
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(pointerImages)
            })));
        });

      // Act
      instance.getPointerImages().subscribe(
        (data) => {
          // Assert
          expect(data).toEqual(pointerImages);
        },
        (error) => {
          fail(error);
        }
      );
    }));
});
