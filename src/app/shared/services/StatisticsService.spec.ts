import {
  it,
  inject,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {StatisticsService} from './StatisticsService';
import {GlobalService} from './GlobalService';
import {Statistic} from '../models/Statistic';
import {StatisticViewModel} from '../models/StatisticViewModel';
import {Duration} from '../models/Duration';
import {DeviceType} from '../enums/UserSettingsEnums';
import {UserSettingsService} from './UserSettingsService';

describe('StatisticsServiceTests', () => {
  function getStatisticViewModelObject(): StatisticViewModel[] {
    let result: StatisticViewModel[] = new Array<StatisticViewModel>();
    let duration = new Duration(48, 0, 0);
    result[0] = new StatisticViewModel('some user', 'JOYSTICK', duration, 2, 3);

    return result;
  }

  function getStatisticObject(): Statistic[] {
    let result: Statistic[] = new Array<Statistic>();
    result[0] = new Statistic('1234567', 'some user', 'Sets', 3, '7/19/2016, 00:00:00 PM', '7/21/2016, 00:00:00 PM', 2, 3);

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
    StatisticsService,
    UserSettingsService
  ]);

  it('should have http', inject([StatisticsService], (instance) => {
    expect(!!instance.http).toEqual(true);
  }));

  it('getLoggedUserStatisticForGame_givenResponsiveHTTP_shouldRetrieveDataFromTheHttpResponse',
    inject([StatisticsService, MockBackend], (instance, mockBackend) => {
      // Arrange
      let response: Statistic[] = getStatisticObject();
      let expected: StatisticViewModel[] = getStatisticViewModelObject();

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(response)
            }
            )));
        });

      // Act
      instance.getLoggedUserStatisticForGame().subscribe(
        (data) => {
          // Assert
          expect(data).toEqual(expected);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('calculateDuration_givenStartAndEndTime_shouldReturnDuration',
    inject([StatisticsService], (instance) => {
      // Arrange
      let start = '7/21/2016, 00:00:00 PM';
      let end = '7/21/2016, 00:00:50 PM';
      let expected = new Duration(0, 0, 50);

      // Act
      let result = instance.calculateDuration(start, end);

      // Assert
      expect(result).toEqual(expected);
    }));

  it('mapToStatisticModelViewArray_givenStatisticArray_shouldReturnStatisticViewModelArray',
    inject([StatisticsService], (instance) => {
      // Arrange
      let stat: Statistic[] = getStatisticObject();
      let statvm: StatisticViewModel[] = getStatisticViewModelObject();

      // Act
      let result = instance.mapToStatisticModelViewArray(stat);

      // Assert
      expect(result).toEqual(statvm);
    }));
});
