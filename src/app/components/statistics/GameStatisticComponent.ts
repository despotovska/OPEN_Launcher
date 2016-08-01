import {Component} from 'angular2/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router, CanActivate} from 'angular2/router';
import {appInjector} from '../../../appInjector';

import {StatisticsService} from '../../shared/services/StatisticsService';
import {AlertingService} from '../../shared/services/AlertingService';
import {AuthService} from '../../shared/services/AuthService';

import {StatisticViewModel} from '../../shared/models/StatisticViewModel';
import {GameStatisticsModel} from '../../shared/models/GameStatisticsModel';
import {Statistic} from '../../shared/models/Statistic';
import {DeviceType} from '../../shared/enums/UserSettingsEnums';

@Component({
  selector: 'statistic',
  templateUrl: './app/components/statistics/gameStatisticView.html',
  pipes: [TranslatePipe]
})
@CanActivate(
  (nextInstr: any, currInstr: any) => {
    let injector: any = appInjector();
    let authService: AuthService = injector.get(AuthService);
    let router: Router = injector.get(Router);
    let isLogged = authService.isLogged();

    if (!isLogged) {
      router.navigate(['/Login']);
    }
    return isLogged;
  }
)
export class GameStatisticComponent {
  public statistics: Array<StatisticViewModel>;
  public games: Array<GameStatisticsModel> = [
    new GameStatisticsModel('Sets', 'SETS', ['DEVICE_TYPE', 'GAME_TIME', 'ITERATION_PASSED', 'INVALID_CLICK_COUNT'])
  ];

  constructor(
    private alertingService: AlertingService,
    private statisticsService: StatisticsService) {
    this.getStatistic(0);
  }

  getStatistic(index: number): void {
    this.statisticsService.getLoggedUserStatisticForGame(this.games[index].gameName)
      .subscribe(data => {
        this.statistics = data;
      },
      err => {
        this.statistics = undefined;
        this.alertingService.addDanger('STATISTIC_ERROR_MESSAGE');
      });
  }
}
