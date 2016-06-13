import {Observable} from 'rxjs/Rx';

import {UserSettings} from '../models/UserSettings';
import {PointerType, PointerSize, PointerColor, BackgroundColor, DeviceTypes} from '../../shared/enums/UserSettingsEnums';
import {IUserSettingsService} from '../services/UserSettingsService';

export class UserSettingsServiceMock implements IUserSettingsService {
  static setUserSetting(userSettings: UserSettings) {
    userSettings.backgroundColor = BackgroundColor.InColor;
    userSettings.pointerType = PointerType.Hand;
    userSettings.pointerSize = PointerSize.Small;
    userSettings.pointerColor = PointerColor.Blue;
    userSettings.deviceType = DeviceTypes.Mouse;
  }

  getUserSettingsFor(userName: string) {
    let userSettings: UserSettings = new UserSettings();
    UserSettingsServiceMock.setUserSetting(userSettings);
    return Observable.of(userSettings);
  }

  getUserSettingsForJar(userName: string) {
    let userSettings: UserSettings = new UserSettings();
    UserSettingsServiceMock.setUserSetting(userSettings);
    let userSettingsForJar: string = '-bw false -ps s -pc white';
    return Observable.of(userSettingsForJar);
  }

  saveUserSettingsForUser(userName: string, userSettings: UserSettings) {
    userSettings = new UserSettings();
    UserSettingsServiceMock.setUserSetting(userSettings);
    return Observable.of(userSettings);
  }
}
