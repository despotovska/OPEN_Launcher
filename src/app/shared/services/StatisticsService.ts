import {Injectable, bind} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';
import {UserSettingsService} from './UserSettingsService';

import {Statistic} from '../models/Statistic';
import {Duration} from '../models/Duration';
import {SetsStatisticViewModel, IStatisticViewModel} from '../models/StatisticViewModel';
import {DeviceType} from '../../shared/enums/UserSettingsEnums';

export interface IStatisticsService {
  getLoggedUserStatisticForGame(game: string): Observable<IStatisticViewModel[]>;
  getStatisticsForSets(): Observable<SetsStatisticViewModel[]>;
}

@Injectable()
export class StatisticsService implements IStatisticsService {
  private sets: string = 'Sets';

  constructor(private http: Http, private globalService: GlobalService, private userSettingsService: UserSettingsService) { }

  getLoggedUserStatisticForGame(game: string): Observable<IStatisticViewModel[]> {
    return this.http.get(this.globalService.URL_GET_STATISTICS(game))
      .map((res: Response) => {
        let array = <Statistic[]>res.json();
        switch (game) {
          case this.sets:
            return this.mapToSetsModelViewArray(array);
          default:
        }
      });
  }

  getStatisticsForSets(): Observable<SetsStatisticViewModel[]> {
    return this.getLoggedUserStatisticForGame(this.sets);
  }

  mapToSetsModelViewArray(array: Statistic[]): SetsStatisticViewModel[] {
    let statisticViewModelArray: SetsStatisticViewModel[] = new Array<SetsStatisticViewModel>();
    for (let i = 0; i < array.length; i++) {
      let stat: Statistic = array[i];
      let startTime: Date = new Date(stat.startTime);
      let endTime: Date = new Date(stat.endTime);
      statisticViewModelArray[i] = new SetsStatisticViewModel(
        stat.username,
        this.userSettingsService.mapDeviceType(stat.deviceType),
        startTime,
        this.calculateDuration(startTime, endTime),
        stat.iterationsPassed,
        stat.invalidClicksCount
      );
    }
    return statisticViewModelArray;
  }

  calculateDuration(startTime: Date, endTime: Date): Duration {
    let hours, minutes, seconds;
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
