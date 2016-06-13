import {Component, Injector} from 'angular2/core';
import {CanActivate} from 'angular2/router';

import {AuthService} from '../../shared/services/AuthService';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {GameLauncherService} from './GameLauncherService';
import {GameModel} from './GameModel';

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
  public zapoznajSeSoKomp: GameModel = new GameModel('Причина и последица', 'desktop_1.0.jar');

  public ucimeSoKomp: Array<GameModel> = [
    new GameModel('Парови', ''),
    new GameModel('Кој се крие', ''),
    new GameModel('Сложувалка', ''),
    new GameModel('Јас и мојот дом', ''),
    new GameModel('Приказна', '')
  ];

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
      if (isGameStarted) return;

      switch (selectedGame) {
        case this.zapoznajSeSoKomp.name:
          this.loadCauseAndEffectGame();
          break;
        default:
          break;
      }
    });
  }

  loadCauseAndEffectGame() {
    this.userSettingsService.getUserSettingsForJar(this.currentUserName)
      .subscribe(userSettings => {
        this.gameLauncherService.loadGame(this.zapoznajSeSoKomp.startCommand, userSettings)
          .subscribe(res => { });
      });
  }
}
