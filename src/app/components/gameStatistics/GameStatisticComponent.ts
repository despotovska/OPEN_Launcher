import {Component} from 'angular2/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router, CanActivate} from 'angular2/router';

import {StatisticsService} from '../../shared/services/StatisticsService';
import {AlertingService} from '../../shared/services/AlertingService';
import {StatisticViewModel} from '../../shared/models/StatisticViewModel';
import {Statistic} from '../../shared/models/Statistic';
import {GameStatisticsModel} from '../../shared/models/GameStatisticsModel';
import {DeviceType} from '../../shared/enums/UserSettingsEnums';
import {AuthService} from '../../shared/services/AuthService';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {appInjector} from '../../../appInjector';

@Component({
  selector: 'statistic',
  templateUrl: `./app/components/gameStatistics/GameStatisticView.html`,
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
      err => this.alertingService.addDanger('STATISTIC_ERROR_MESSAGE'));
  }

}
