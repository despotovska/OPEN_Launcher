import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {StatisticsService} from '../../shared/services/StatisticsService';
import {AlertingService} from '../../shared/services/AlertingService';
import {StatisticViewModel} from '../../shared/models/StatisticViewModel';
import {Statistic} from '../../shared/models/Statistic';
import {GameStatisticComponent} from './GameStatisticComponent';


describe('GameStatisticComponentTests', () => {
  beforeEachProviders(() => [
    AlertingService,
    StatisticsService,
    StatisticViewModel,
    Statistic,
  ])
  it('hasStatistics_shouldReturnTrue',
    inject([GameStatisticComponent], (instance) => {
      // Act
      let result = instance.getStatistics();

      // Assert
      expect(result).toBeTruthy();
    }));


