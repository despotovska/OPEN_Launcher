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

  it('loadGame_givenSelectedGame_shouldCallLoadGameApi_WhenGameIsNotStarted',
    inject([HomeComponent], (instance) => {
      // Arrange
      GameLauncherServiceMock.gameStarted = false;

      spyOn(instance.authService, 'getUser').and.callThrough();
      spyOn(instance.gameLauncherService, 'isGameStarted').and.callThrough();
      spyOn(instance.userSettingsService, 'getUserSettingsForJar').and.callThrough();
      spyOn(instance.gameLauncherService, 'loadGame').and.callThrough();

      let gameName = 'Причина и последица';

      // Act
      instance.loadGame(gameName);

      // Assert
      expect(instance.gameLauncherService.isGameStarted).toHaveBeenCalled();
      expect(instance.userSettingsService.getUserSettingsForJar).toHaveBeenCalled();
      expect(instance.gameLauncherService.loadGame).toHaveBeenCalled();
    }));

  it('loadGame_givenSelectedGame_shouldNotCallLoadGameApi_WhenGameIsAlreadyStartted',
    inject([HomeComponent], (instance) => {
      // Arrange
      GameLauncherServiceMock.gameStarted = true;

      spyOn(instance.authService, 'getUser').and.callThrough();
      spyOn(instance.gameLauncherService, 'isGameStarted').and.callThrough();
      spyOn(instance.userSettingsService, 'getUserSettingsForJar').and.callThrough();
      spyOn(instance.gameLauncherService, 'loadGame').and.callThrough();

      let gameName = 'Причина и последица';

      // Act
      instance.loadGame(gameName);

      // Assert
      expect(instance.gameLauncherService.isGameStarted).toHaveBeenCalled();
      expect(instance.userSettingsService.getUserSettingsForJar).not.toHaveBeenCalled();
      expect(instance.gameLauncherService.loadGame).not.toHaveBeenCalled();
    }));
});
