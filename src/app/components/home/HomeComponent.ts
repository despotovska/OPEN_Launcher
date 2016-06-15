import {Component, Injector} from 'angular2/core';
import {CanActivate} from 'angular2/router';

import {AuthService} from '../../shared/services/AuthService';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {GameLauncherService} from './GameLauncherService';
import {AlertingService} from '../../shared/services/AlertingService';
import {LearnWithTheComputer} from '../../shared/enums/GamesEnum';

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
  public getToKnowTheComputer: GameModel = new GameModel(
    'Причина и последица',
    'cause_and_effect.png',
    'java -jar {gamesPath}cause_and_effect_1.0.jar');

  public learningWithTheComputer: Array<GameModel> = [
    new GameModel('Парови', 'sets.png', '{gamesPath}OPEN_Sets-win32-x64/OPEN_Sets.exe'),
    new GameModel('Кој се крие', 'computer.png', ''),
    new GameModel('Сложувалка', 'computer.png', ''),
    new GameModel('Јас и мојот дом', 'computer.png', ''),
    new GameModel('Приказна', 'computer.png', '')
  ];

  public currentUserName: string;

  constructor(
    private alertingService: AlertingService,
    private authService: AuthService,
    private userSettingsService: UserSettingsService,
    private gameLauncherService: GameLauncherService) {
    this.currentUserName = this.authService.getUser();
  }

  loadGame(selectedGame) {
    this.gameLauncherService.isGameStarted().subscribe(data => {
      let isGameStarted: boolean = data;
      if (isGameStarted) {
        this.alertingService.addInfo('Моментално имате започнато игра. Затворете го прозорецот со активната игра за да започнете нова.');
        return;
      }

      switch (selectedGame) {
        case this.getToKnowTheComputer.name:
          this.loadCauseAndEffectGame();
          break;
        case this.learningWithTheComputer[LearnWithTheComputer.Pairs].name:
          this.loadPairsGame();
          break;
        case this.learningWithTheComputer[LearnWithTheComputer.WhoIsHiding].name:
          break;
        case this.learningWithTheComputer[LearnWithTheComputer.Puzzle].name:
          break;
        case this.learningWithTheComputer[LearnWithTheComputer.MeAndMyHome].name:
          break;
        case this.learningWithTheComputer[LearnWithTheComputer.Story].name:
          break;
        default:
          break;
      }
    });
  }

  loadCauseAndEffectGame() {
    this.userSettingsService.getUserSettingsForJar(this.currentUserName)
      .subscribe(userSettings => {
        this.gameLauncherService.loadGame(this.getToKnowTheComputer.startCommand + userSettings)
          .subscribe(res => { });
      });
  }

  loadPairsGame() {
    this.userSettingsService.getUserSettingsForElectron(this.currentUserName)
      .subscribe(userSettings => {
        this.gameLauncherService.loadGame(this.learningWithTheComputer[0].startCommand + userSettings)
          .subscribe(res => { });
      });
  }
}
