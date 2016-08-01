import {
  beforeEachProviders,
  it,
  inject
}
from 'angular2/testing';
import {provide} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {StatisticsService} from '../../shared/services/StatisticsService';
import {StatisticsServiceMock} from '../../shared/mocks/StatisticsServiceMock';
import {AlertingService} from '../../shared/services/AlertingService';
import {GameStatisticComponent} from './GameStatisticComponent';

describe('GameStatisticComponentTests', () => {
  beforeEachProviders(() => [
    GameStatisticComponent,
    AlertingService,
    provide(StatisticsService, { useClass: StatisticsServiceMock })
  ]);

  it('somename',
    inject([GameStatisticComponent], (instance) => {
      // Arrange
      spyOn(instance.statisticsService, 'getLoggedUserStatisticForGame').and.callThrough();
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });

      // Act
      // instance.getStatisic('SETS');

      // Assert
      expect(instance.stats[0].username).toEqual('name');
      expect(instance.stats.length).toEqual(1);
    }));

//   it('error',
//     inject([GameStatisticComponent], (instance) => {
//       // Arrange
//       spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
//       spyOn(instance.StatisticsService, 'getLoggedUserStatisticForGame').and.callFake(() => { return Observable.throw(new Error()); });

//       // Act

//       // Assert
//       expect(instance.alertingService.addDanger).toHaveBeenCalledWith('STATISTIC_ERROR_MESSAGE');


//     }));
// });
