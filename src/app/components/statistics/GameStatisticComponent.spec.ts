import {
  beforeEachProviders,
  it,
  inject
}
from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';

import {GameStatisticComponent} from './GameStatisticComponent';

import {StatisticsService} from '../../shared/services/StatisticsService';
import {AlertingService} from '../../shared/services/AlertingService';

describe('GameStatisticComponentTests', () => {
  beforeEachProviders(() => [
    GameStatisticComponent,
    AlertingService,
    StatisticsService
  ]);
});
