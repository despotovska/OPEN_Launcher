import {Component, Injector} from 'angular2/core';
import {CanActivate} from 'angular2/router';

import {AuthService} from '../../shared/services/AuthService';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {GameLauncherService} from './GameLauncherService';

@Component({
  selector: 'home',
  templateUrl: `./app/components/home/home.html`
})
@CanActivate(
  (nextInstr: any, currInstr: any) => {
    let injector: any = Injector.resolveAndCreate([AuthService]);
    let authService: AuthService = injector.get(AuthService);
    return authService.isLogged();
  }
)
export class HomeComponent {
  public zapoznajSeSoKomp = {
    name: 'Причина и последица',
    gameFileName: 'desktop-1.0.jar'
  };
  public ucimeSoKomp: Array<string> = ['Парови', 'Кој се крие', 'Сложувалка', 'Јас и мојот дом', 'Приказна'];
  public currentUserName: string;

  constructor(
    private authService: AuthService,
    private userSettingsService: UserSettingsService,
    private gameLauncherService: GameLauncherService) {
    this.currentUserName = this.authService.getUser();
  }

  loadGame(selectedGame) {
    this.gameLauncherService.isGameStarted().subscribe(data => {
      let isGameStarted: boolean = data;

      if (!isGameStarted) {
        this.userSettingsService.getUserSettingsForJar(this.currentUserName)
          .subscribe(userSettings => {
            this.gameLauncherService.loadGame(selectedGame, userSettings)
              .subscribe(res => { });
          });
      }
    });
  }
}
