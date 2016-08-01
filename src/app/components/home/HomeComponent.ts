import {Component} from 'angular2/core';
import {Router, CanActivate} from 'angular2/router';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {appInjector} from '../../../appInjector';

import {AuthService} from '../../shared/services/AuthService';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {GameLauncherService} from './GameLauncherService';
import {AlertingService} from '../../shared/services/AlertingService';

import {LearningWithTheComputer, GameCategory} from '../../shared/enums/GamesEnums';
import {CategoryModel} from './CategoryModel';
import {GameModel} from './GameModel';

@Component({
  selector: 'home',
  templateUrl: './app/components/home/home.html',
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
export class HomeComponent {
  public causeAndEffectGame: GameModel = new GameModel(
    'CAUSE_AND_EFFECT',
    'cause_and_effect.png',
    'java -jar {gamesPath}cause_and_effect_1.0.jar');

  public learningWithTheComputer: Array<GameModel> = [
    new GameModel('SETS', 'sets.png', '{gamesPath}OPEN_Sets-win32-x64/OPEN_Sets.exe'),
    new GameModel('WHO_IS_HIDING', 'computer.png', ''),
    new GameModel('PUZZLE', 'computer.png', ''),
    new GameModel('ME_AND_MY_HOME', 'computer.png', ''),
    new GameModel('STORY', 'computer.png', '')
  ];

  public gamesCategories: Array<CategoryModel> = [
    new CategoryModel('GET_TO_KNOW_THE_PC', [this.causeAndEffectGame]),
    new CategoryModel('LEARN_WITH_THE_PC', this.learningWithTheComputer)];

  public currentUserName: string;

  constructor(
    private alertingService: AlertingService,
    private authService: AuthService,
    private userSettingsService: UserSettingsService,
    private gameLauncherService: GameLauncherService,
    private translate: TranslateService) {
    this.currentUserName = this.authService.getLoggedUser();
  }

  loadGame(gameCategory: number, gameIndex: number): void {
    this.gameLauncherService.isGameStarted().subscribe(isGameStarted => {
      if (isGameStarted) {
        this.alertingService.addInfo('GAME_STARTED_MESSAGE');
        return;
      }

      if (gameCategory === GameCategory.GetToKnowTheComputer) {
        this.loadCauseAndEffectGame();
      } else {
        this.loadLearningWithTheComputerGame(this.learningWithTheComputer[gameIndex].startCommand);
      }
    });
  }

  loadCauseAndEffectGame() {
    this.userSettingsService.getUserSettingsForJar(this.currentUserName)
      .subscribe(userSettings => {
        this.gameLauncherService.loadGame(this.causeAndEffectGame.startCommand + userSettings);
      });
  }

  loadLearningWithTheComputerGame(startCommand: string) {
    this.userSettingsService.getUserSettingsForElectron(this.currentUserName)
      .subscribe(userSettings => {
        // pass the logged user's settings
        startCommand += userSettings;

        // pass the current language
        startCommand += this.getCurrentLanguage();

        this.gameLauncherService.loadGame(startCommand);
      });
  }

  getCurrentLanguage(): string {
    return ' ' + this.translate.currentLang;
  }
}
