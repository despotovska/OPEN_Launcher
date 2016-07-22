import {Injectable, bind} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';
import {Statistic} from '../models/Statistic';
import {Duration} from '../models/Duration';
import {StatisticViewModel} from '../models/StatisticViewModel';

export interface IStatisticsService {
  getLoggedUserStatisticForGame(game: string): Observable<StatisticViewModel[]>;
  mapToStatisticModelViewArray(array: Statistic[]): StatisticViewModel[];
  calculateDuration(start: string, end: string): Duration;
}

@Injectable()
export class StatisticsService implements IStatisticsService {
  statisticViewModelArray: StatisticViewModel[] = new Array<StatisticViewModel>();
  constructor(private http: Http, private globalService: GlobalService) { }

  getLoggedUserStatisticForGame(game: string): Observable<StatisticViewModel[]> {
    return this.http.get(this.globalService.URL_GETSTATISTIC(game))
      .map((res: Response) => {
        let array = <Statistic[]>res.json();
        return this.mapToStatisticModelViewArray(array);
      });
  }

  mapToStatisticModelViewArray(array: Statistic[]): StatisticViewModel[] {
    for (let index = 0; index < array.length; index++) {
      let duration: Duration = this.calculateDuration(array[index].startTime, array[index].endTime);
      this.statisticViewModelArray[index] = new StatisticViewModel(
        array[index].username,
        array[index].deviceType,
        duration,
        array[index].iterationsPassed,
        array[index].invalidClicksCount
      );
    }

    return this.statisticViewModelArray;
  }

  calculateDuration(start: string, end: string): Duration {
    let h, m, s;
    let startTime: Date = new Date(start);
    let endTime: Date = new Date(end);
    let millisec = (endTime.valueOf() - startTime.valueOf());
    s = Math.floor(millisec / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    let res = new Duration(h, m, s);
    return res;
  }
}

export let statisticsServiceInjectables: Array<any> = [bind(StatisticsService).toClass(StatisticsService)];
