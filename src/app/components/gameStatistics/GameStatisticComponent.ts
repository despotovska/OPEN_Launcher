import {Component} from 'angular2/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {StatisticsService} from '../../shared/services/StatisticsService';
import {AlertingService} from '../../shared/services/AlertingService';
import {StatisticViewModel} from '../../shared/models/StatisticViewModel';
import {Statistic} from '../../shared/models/Statistic';
import {GameStatisticsModel} from '../../shared/models/GameStatisticsModel';
import {DeviceTypes} from '../../shared/enums/UserSettingsEnums';

@Component({
  selector: 'statistic',
  templateUrl: `./app/components/gameStatistics/GameStatisticView.html`,
  pipes: [TranslatePipe]
})
export class GameStatisticComponent {
  public stats: Array<StatisticViewModel> = new Array<StatisticViewModel>();

  public games = [ 'SETS','CAUSE AND EFFECT'];

  public StatisticTable: Array<GameStatisticsModel> = [
    new GameStatisticsModel('SETS',['DEVICE_TYPE', 'DURATION', 'ITERATION_PASSED', 'INVALID_CLICK_COUNT'])
  ];
   public devices: string[] = ['MOUSE', 'TOUCHSCREEN', 'TRACKBALL', 'JOYSTICK', 'KEY', 'KEY_AND_TRACKBALL', 'KEY_AND_JOYSTICK'];

  constructor(private alertingService: AlertingService,
    private statisticsService: StatisticsService) {
      this.getStatistic("SETS");
  }

  getStatistic(game: string): void {
    this.statisticsService.getLoggedUserStatisticForGame("Sets")
      .subscribe(data => {
        this.stats = data;
        console.log(this.stats.length);
      },
      err => this.alertingService.addDanger('Грешка при вчитување на статистика.'));
  }
}
