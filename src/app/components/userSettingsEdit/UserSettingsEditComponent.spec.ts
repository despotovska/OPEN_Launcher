import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

import {User} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserSettingsComponent} from '../userSettings/UserSettingsComponent';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../../shared/services/AlertingService';
import {UserSettingsEditComponent} from './UserSettingsEditComponent';
import {AuthService} from '../../shared/services/AuthService';
import {Alert} from '../../shared/models/Alert';
import {UserSettings} from '../../shared/models/UserSettings';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';

import {AuthServiceMock} from '../../shared/mocks/AuthServiceMock';
import {UserSettingsServiceMock} from '../../shared/mocks/UserSettingsServiceMock';

describe('UserSettingsEditComponentTests', () => {
  beforeEachProviders(() => [
    AlertingService,
    provide(AuthService, { useClass: AuthServiceMock }),
    provide(UserSettingsService, { useClass: UserSettingsServiceMock }),
    UserSettingsEditComponent
  ]);

  it('saveUserSettings_givenAvailableUserSettingsService_shouldSaveUserSettingsAndAlertForSuccessIsCalled',
    inject([UserSettingsEditComponent], (instance) => {
      // Arrange
      instance.userSettings = UserSettingsServiceMock.getUserSetting();
      spyOn(instance.userSettingsService, 'saveUserSettingsForUser').and.callThrough();
      spyOn(instance.alertingService, 'addSuccess').and.callFake(() => { });

      // Act
      instance.saveUserSettings();

      // Assert
      expect(instance.userSettingsService.saveUserSettingsForUser).toHaveBeenCalled();
      expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('SAVE_USER_SETTINGS_SUCCESS_MESSAGE');
    }));

  it('saveUserSettings_givenUnavailableUserSettingsService_shouldThrowAlertForDanger',
    inject([UserSettingsEditComponent], (instance) => {
      // Arrange
      instance.userSettings = UserSettingsServiceMock.getUserSetting();
      spyOn(instance.userSettingsService, 'saveUserSettingsForUser').and.callFake(() => { return Observable.throw(new Error()); });
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });

      // Act
      instance.saveUserSettings();

      // Assert
      expect(instance.userSettingsService.saveUserSettingsForUser).toHaveBeenCalled();
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('SAVE_USER_SETTINGS_ERROR_MESSAGE');
    }));
});
