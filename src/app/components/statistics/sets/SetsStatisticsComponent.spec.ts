import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {SetsStatisticsComponent} from './SetsStatisticsComponent';

import {StatisticsService} from '../../../shared/services/StatisticsService';
import {AlertingService} from '../../../shared/services/AlertingService';

import {StatisticsServiceMock} from '../../../shared/mocks/StatisticsServiceMock';

describe('SetsStatisticsComponentTests', () => {
  beforeEachProviders(() => [
    SetsStatisticsComponent,
    AlertingService,
    provide(StatisticsService, { useClass: StatisticsServiceMock })
  ]);

  it('loadStatistics_givenStatisicsServiceAvailable_shouldLoadStatistics',
    inject([SetsStatisticsComponent], (instance) => {
      // Arrange
      spyOn(instance.statisticsService, 'getStatisticsForSets').and.callThrough();

      // Act
      instance.loadStatistics();

      // Assert
      expect(instance.statistics[0].username).toEqual('name');
      expect(instance.statistics.length).toEqual(1);
    }));

  it('loadStatistics_givenStatisicsServicUnavailable_shouldShowAlertForDanger',
    inject([SetsStatisticsComponent], (instance) => {
      // Arrange
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      spyOn(instance.statisticsService, 'getStatisticsForSets').and.callFake(() => { return Observable.throw(new Error()); });

      // Act
      instance.loadStatistics();

      // Assert
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('STATISTIC_ERROR_MESSAGE');
    }));
});
