import {Observable} from 'rxjs/Rx';
import {Duration} from '../models/Duration';
import {StatisticViewModel} from '../../shared/models/StatisticViewModel';

export class StatisticsServiceMock {

  getLoggedUserStatisticForGame(game: string) {
    let data: Array<StatisticViewModel> = new Array<StatisticViewModel>();
    data[0] = new StatisticViewModel('name', 'joystick', new Duration('0', '10', '15'), 5, 17);
    return Observable.of(data);
  }
}
