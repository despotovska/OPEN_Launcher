import {Injectable, bind} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';
import {Statistic} from '../models/Statistic';
import {StatisticViewModel} from '../models/StatisticViewModel';

export interface IStatisticsService {
  getLoggedUserStatisticForGame(game: string): Observable<StatisticViewModel[]>;
  mapToStatisticModelViewArray(array: Statistic[]): StatisticViewModel[];
  calculateDuration(start: string, end: string): string;
  getHoursMinSecFormat(ms: number);
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
    let duration = 'not applicable';
    for (let index = 0; index < array.length; index++) {
      if (array[index].endTime !== '') {
        duration = this.calculateDuration(array[index].startTime, array[index].endTime);
      }
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

  calculateDuration(start: string, end: string): string {
    let startTime: Date = new Date(start);
    let endTime: Date = new Date(end);
    let millisec = (endTime.valueOf() - startTime.valueOf());
    return this.getHoursMinSecFormat(millisec);
  }

  getHoursMinSecFormat(ms: number) {
    let d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    let res = h + ' hours ' + m + ' min ' + s + ' sec';
    return res;
  }
}

export let statisticsServiceInjectables: Array<any> = [bind(StatisticsService).toClass(StatisticsService)];
