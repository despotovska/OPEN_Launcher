import {Injectable, bind} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';
import {Statistic} from '../models/Statistic';
import {Duration} from '../models/Duration';
import {StatisticViewModel} from '../models/StatisticViewModel';
import {DeviceType} from '../../shared/enums/UserSettingsEnums';
import {UserSettingsService} from './UserSettingsService';

export interface IStatisticsService {
  getLoggedUserStatisticForGame(game: string): Observable<StatisticViewModel[]>;
}

@Injectable()
export class StatisticsService implements IStatisticsService {
  constructor(private http: Http, private globalService: GlobalService, private userSettingsService: UserSettingsService) { }

  getLoggedUserStatisticForGame(game: string): Observable<StatisticViewModel[]> {
    return this.http.get(this.globalService.URL_GET_STATISTICS(game))
      .map((res: Response) => {
        let array = <Statistic[]>res.json();
        return this.mapToStatisticModelViewArray(array);
      });
  }

  mapToStatisticModelViewArray(array: Statistic[]): StatisticViewModel[] {
    let statisticViewModelArray: StatisticViewModel[] = new Array<StatisticViewModel>();
    for (let index = 0; index < array.length; index++) {
      let duration: Duration = this.calculateDuration(array[index].startTime, array[index].endTime);
      statisticViewModelArray[index] = new StatisticViewModel(
        array[index].username,
        this.userSettingsService.mapDeviceType(array[index].deviceType),
        duration,
        array[index].iterationsPassed,
        array[index].invalidClicksCount
      );
    }
    return statisticViewModelArray;
  }

  calculateDuration(start: string, end: string): Duration {
    let hours, minutes, seconds;
    let startTime: Date = new Date(start);
    let endTime: Date = new Date(end);
    let millisec = (endTime.valueOf() - startTime.valueOf());
    seconds = Math.floor(millisec / 1000);
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let res = new Duration(hours.toString(), minutes.toString(), seconds.toString());
    return res;
  }
}

export let statisticsServiceInjectables: Array<any> = [bind(StatisticsService).toClass(StatisticsService)];
