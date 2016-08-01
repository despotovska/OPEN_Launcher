import {
  it,
  inject,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {TranslateService, TRANSLATE_PROVIDERS} from 'ng2-translate/ng2-translate';

import {HomeComponent} from './HomeComponent';

import {GameLauncherService} from './GameLauncherService';
import {AuthService} from '../../shared/services/AuthService';
import {AlertingService} from '../../shared/services/AlertingService';
import {UserSettingsService} from '../../shared/services/UserSettingsService';

import {LearningWithTheComputer, GameCategory} from '../../shared/enums/GamesEnums';

import {AuthServiceMock} from '../../shared/mocks/AuthServiceMock';
import {GameLauncherServiceMock} from '../../shared/mocks/GameLauncherServiceMock';
import {UserSettingsServiceMock} from '../../shared/mocks/UserSettingsServiceMock';

describe('HomeComponentTests', () => {
  beforeEachProviders(() => [
    AlertingService,
    provide(AuthService, { useClass: AuthServiceMock }),
    provide(GameLauncherService, { useClass: GameLauncherServiceMock }),
    provide(UserSettingsService, { useClass: UserSettingsServiceMock }),
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend, defaultOptions) => {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    TRANSLATE_PROVIDERS,
    TranslateService,
    TranslateService,
    HomeComponent
  ]);

  it('loadGame_givenSelectedGame_shouldNotCallLoadGameApi_WhenGameIsAlreadyStarted',
    inject([HomeComponent], (instance) => {
      // Arrange
      GameLauncherServiceMock.gameStarted = true;
      spyOn(instance.gameLauncherService, 'loadGame').and.callThrough();
      spyOn(instance.alertingService, 'addInfo').and.callFake(() => { });
      let gameIndex = 0;

      // Act
      instance.loadGame(GameCategory.GetToKnowTheComputer, gameIndex);

      // Assert
      expect(instance.gameLauncherService.loadGame).not.toHaveBeenCalled();
      expect(instance.alertingService.addInfo)
        .toHaveBeenCalledWith('GAME_STARTED_MESSAGE');
    }));

  it('loadGame_givenSelectedGameIsCauseAndEffect_shouldCallLoadCauseAndEffectGame_WhenGameIsNotStarted',
    inject([HomeComponent], (instance) => {
      // Arrange
      GameLauncherServiceMock.gameStarted = false;
      spyOn(instance, 'loadCauseAndEffectGame').and.callFake(() => { });
      let gameIndex = 0;

      // Act
      instance.loadGame(GameCategory.GetToKnowTheComputer, gameIndex);

      // Assert
      expect(instance.loadCauseAndEffectGame).toHaveBeenCalled();
    }));

  it('loadGame_givenSelectedGameIsPairs_shouldCallLoadPairsGame_WhenNoGameIsStarted',
    inject([HomeComponent], (instance) => {
      // Arrange
      GameLauncherServiceMock.gameStarted = false;
      spyOn(instance, 'loadLearningWithTheComputerGame').and.callFake(() => { });
      let gameIndex = 0;

      // Act
      instance.loadGame(GameCategory.LearningWithTheComputer, gameIndex);

      // Assert
      expect(instance.loadLearningWithTheComputerGame).toHaveBeenCalled();
    }));

  it('loadCauseAndEffectGame_givenAvailableGameLauncherService_shouldCallLoadGame',
    inject([HomeComponent], (instance) => {
      // Arrange
      spyOn(instance.gameLauncherService, 'loadGame').and.callThrough();

      // Act
      instance.loadCauseAndEffectGame();

      // Assert
      expect(instance.gameLauncherService.loadGame).toHaveBeenCalled();
    }));

  it('loadPairsGame_givenAvailableGameLauncherService_shouldCallLoadGame',
    inject([HomeComponent], (instance) => {
      // Arrange
      spyOn(instance.gameLauncherService, 'loadGame').and.callThrough();

      // Act
      instance.loadLearningWithTheComputerGame();

      // Assert
      expect(instance.gameLauncherService.loadGame).toHaveBeenCalled();
    }));
});
