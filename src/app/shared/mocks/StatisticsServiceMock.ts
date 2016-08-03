import {Observable} from 'rxjs/Rx';

import {IStatisticsService} from '../services/StatisticsService';

import {Duration} from '../models/Duration';
import {SetsStatisticViewModel} from '../../shared/models/StatisticViewModel';

export class StatisticsServiceMock implements IStatisticsService {

  getLoggedUserStatisticForGame(game: string) {
    let data: Array<SetsStatisticViewModel> = new Array<SetsStatisticViewModel>();
    data[0] = new SetsStatisticViewModel('name', 'joystick', new Date(), new Duration('0', '10', '15'), 5, 17);
    return Observable.of(data);
  }

  getStatisticsForSets() {
    return this.getLoggedUserStatisticForGame('');
  }
}
