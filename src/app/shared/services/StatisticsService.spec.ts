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
import {DeviceTypes} from '../enums/UserSettingsEnums';

describe('StatisticsServiceTests', () => {
  function getStatisticViewModelObject(): StatisticViewModel[] {
    let result: StatisticViewModel[] = new Array<StatisticViewModel>();
    result[0] = new StatisticViewModel('some user', DeviceTypes.Joystick, '48 hours 0 min 0 sec', 2, 3);

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
    StatisticsService
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
          expect(data[0].deviceType).toBe(expected[0].deviceType);
          expect(data[0].duration).toBe(expected[0].duration);
          expect(data[0].invalidClicksCount).toBe(expected[0].invalidClicksCount);
          expect(data[0].iterationsPassed).toBe(expected[0].iterationsPassed);
          expect(data[0].username).toBe(expected[0].username);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('calculateDuration_givenStartAndEndTime_shouldCallGetHoursMinSecFormat',
    inject([StatisticsService], (instance) => {
      // Arrange
      let start = '7/21/2016, 00:00:00 PM';
      let end = '7/21/2016, 00:00:50 PM';
      let ms = 50000;
      spyOn(instance, 'getHoursMinSecFormat').and.callFake(() => { });

      // Act
      let result = instance.calculateDuration(start, end);

      // Assert
      expect(instance.getHoursMinSecFormat).toHaveBeenCalledWith(ms);
    }));

  it('mapToStatisticModelViewArray_givenStatisticArray_shouldReturnStatisticViewModelArray',
    inject([StatisticsService], (instance) => {
      // Arrange
      let stat: Statistic[] = getStatisticObject();
      let statvm: StatisticViewModel[] = getStatisticViewModelObject();

      // Act
      let result = instance.mapToStatisticModelViewArray(stat);

      // Assert
      expect(result[0].username).toBe(statvm[0].username);
      expect(result[0].deviceType).toBe(statvm[0].deviceType);
      expect(result[0].duration).toBe(statvm[0].duration);
      expect(result[0].iterationsPassed).toBe(statvm[0].iterationsPassed);
      expect(result[0].invalidClicksCount).toBe(statvm[0].invalidClicksCount);
    }));

    it('getHoursMinSecFormat_givenMilliseconds_shouldReturnHoursMinSecFormat',
    inject([StatisticsService], (instance) => {
      // Arrange
      let ms = 10000;
      let expected = '0 hours 0 min 10 sec';

      // Act
      let result = instance.getHoursMinSecFormat(ms);

      // Assert
      expect(result).toBe(expected);
    }));
});
