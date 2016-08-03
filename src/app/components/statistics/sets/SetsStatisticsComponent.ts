import {Component} from 'angular2/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {AlertingService} from '../../../shared/services/AlertingService';
import {StatisticsService} from '../../../shared/services/StatisticsService';

import {SetsStatisticViewModel} from '../../../shared/models/StatisticViewModel';

@Component({
  selector: 'sets-statistics',
  templateUrl: './app/components/statistics/sets/setsStatistics.html',
  pipes: [TranslatePipe]
})
export class SetsStatisticsComponent {
  public statistics: Array<SetsStatisticViewModel>;
  public headers: Array<string> = ['DEVICE_TYPE', 'START_TIME', 'GAME_TIME', 'INVALID_CLICK_COUNT'];

  constructor(
    private alertingService: AlertingService,
    private statisticsService: StatisticsService) {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getStatisticsForSets()
      .subscribe(data => {
        this.statistics = data;
      },
      err => {
        this.statistics = undefined;
        this.alertingService.addDanger('STATISTIC_ERROR_MESSAGE');
      });
  }
}
