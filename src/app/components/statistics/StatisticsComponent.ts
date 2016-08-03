import {Component} from 'angular2/core';
import {Router, CanActivate, RouteConfig, ROUTER_DIRECTIVES, ComponentInstruction} from 'angular2/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {SetsStatisticsComponent} from './sets/SetsStatisticsComponent';

import {isLoggedIn} from '../../shared/services/AuthService';

import {GameStatisticsModel} from '../../shared/models/GameStatisticsModel';

@Component({
  selector: 'statistics',
  templateUrl: './app/components/statistics/statistics.html',
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/sets', component: SetsStatisticsComponent, name: 'SetsStats', useAsDefault: true },
  { path: '/*path', redirectTo: ['../NotFound'] }
])
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return isLoggedIn(next, previous);
})
export class StatisticsComponent {
  public games: Array<GameStatisticsModel> = [
    new GameStatisticsModel('SetsStats', 'SETS')
  ];

  constructor(private router: Router) { }

  navigateToStatisticsTable(routeName: string) {
    this.router.navigate(['/' + routeName]);
  }
}
