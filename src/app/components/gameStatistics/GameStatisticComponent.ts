import {Component} from 'angular2/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {StatisticsService} from '../../shared/services/StatisticsService';
import {AlertingService} from '../../shared/services/AlertingService';
import {StatisticViewModel} from '../../shared/models/StatisticViewModel';
import {Statistic} from '../../shared/models/Statistic';
import {GameStatisticsModel} from '../../shared/models/GameStatisticsModel';
import {DeviceType} from '../../shared/enums/UserSettingsEnums';
import {UserSettingsService} from '../../shared/services/UserSettingsService';

@Component({
  selector: 'statistic',
  templateUrl: `./app/components/gameStatistics/GameStatisticView.html`,
  pipes: [TranslatePipe]
})
export class GameStatisticComponent {
  public stats: Array<StatisticViewModel> = new Array<StatisticViewModel>();

  public games = ['SETS', 'CAUSE AND EFFECT'];

  public statisticTable: Array<GameStatisticsModel> = [
    new GameStatisticsModel('SETS', ['DEVICE_TYPE', 'DURATION1', 'ITERATION_PASSED', 'INVALID_CLICK_COUNT'])
  ];
  constructor(private alertingService: AlertingService,
    private statisticsService: StatisticsService) {
    this.getStatistic('Sets');
  }
  getStatistic(game: string): void {
    this.statisticsService.getLoggedUserStatisticForGame(game)
      .subscribe(data => {
        this.stats = data;
        console.log(this.stats.length);
      },
      err => this.alertingService.addDanger('Грешка при вчитување на статистика.'));
  }

}
