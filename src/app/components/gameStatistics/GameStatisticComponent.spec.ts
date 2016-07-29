import {
  beforeEachProviders,
  it,
  inject
}
 from 'angular2/testing';
import {provide} from 'angular2/core';

import {StatisticsService} from '../../shared/services/StatisticsService';
import {AlertingService} from '../../shared/services/AlertingService';
import {GameStatisticComponent} from './GameStatisticComponent';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {UserSettingsServiceMock} from '../../shared/mocks/UserSettingsServiceMock';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';

describe('GameStatisticComponentTests', () => {
  beforeEachProviders(() => [
    GameStatisticComponent,
    AlertingService,
    StatisticsService,
    provide (UserSettingsService, { useClass: UserSettingsServiceMock })
  ]);
});
