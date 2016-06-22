import {
  it,
  inject,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {HomeComponent} from './HomeComponent';
import {GameLauncherService} from './GameLauncherService';
import {GameLauncherServiceMock} from '../../shared/mocks/GameLauncherServiceMock';
import {AuthServiceMock} from '../../shared/mocks/AuthServiceMock';
import {AuthService} from '../../shared/services/AuthService';
import {AlertingService} from '../../shared/services/AlertingService';
import {UserSettingsServiceMock} from '../../shared/mocks/UserSettingsServiceMock';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {Observable} from 'rxjs/Rx';

describe('HomeComponentTests', () => {
  beforeEachProviders(() => [
    AlertingService,
    provide(AuthService, { useClass: AuthServiceMock }),
    provide(GameLauncherService, { useClass: GameLauncherServiceMock }),
    provide(UserSettingsService, { useClass: UserSettingsServiceMock }),
    HomeComponent
  ]);

  it('loadGame_givenSelectedGame_shouldNotCallLoadGameApi_WhenGameIsAlreadyStartted',
    inject([HomeComponent], (instance) => {
      // Arrange
      GameLauncherServiceMock.gameStarted = true;
      spyOn(instance.gameLauncherService, 'loadGame').and.callThrough();
      spyOn(instance.alertingService, 'addInfo').and.callFake(() => { });
      let gameName = 'Причина и последица';

      // Act
      instance.loadGame(gameName);

      // Assert
      expect(instance.gameLauncherService.loadGame).not.toHaveBeenCalled();
      expect(instance.alertingService.addInfo)
        .toHaveBeenCalledWith('Моментално имате започнато игра. Затворете го прозорецот со активната игра за да започнете нова.');
    }));

  it('loadGame_givenSelectedGameIsCauseAndEffect_shouldCallLoadCauseAndEffectGame_WhenGameIsNotStarted',
    inject([HomeComponent], (instance) => {
      // Arrange
      GameLauncherServiceMock.gameStarted = false;
      spyOn(instance, 'loadCauseAndEffectGame').and.callFake(() => { });
      let gameName = 'Причина и последица';

      // Act
      instance.loadGame(gameName);

      // Assert
      expect(instance.loadCauseAndEffectGame).toHaveBeenCalled();
    }));

  it('loadGame_givenSelectedGameIsPairs_shouldCallLoadPairsGame_WhenNoGameIsStarted',
    inject([HomeComponent], (instance) => {
      // Arrange
      GameLauncherServiceMock.gameStarted = false;
      spyOn(instance, 'loadPairsGame').and.callFake(() => { });
      let gameName = 'Парови';

      // Act
      instance.loadGame(gameName);

      // Assert
      expect(instance.loadPairsGame).toHaveBeenCalled();
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
      instance.loadPairsGame();

      // Assert
      expect(instance.gameLauncherService.loadGame).toHaveBeenCalled();
    }));
});
