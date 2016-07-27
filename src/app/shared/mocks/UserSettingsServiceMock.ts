import {Observable} from 'rxjs/Rx';

import {UserSettings} from '../models/UserSettings';
import {PointerType, PointerSize, PointerColor, BackgroundColor, DeviceType} from '../../shared/enums/UserSettingsEnums';
import {IUserSettingsService} from '../services/UserSettingsService';

export class UserSettingsServiceMock implements IUserSettingsService {
  static getUserSetting(): UserSettings {
    return new UserSettings(
      PointerType.Hand,
      PointerSize.Small,
      PointerColor.Blue,
      BackgroundColor.InColor,
      DeviceType.Mouse);
  }

  getUserSettingsFor(userName: string) {
    return Observable.of(UserSettingsServiceMock.getUserSetting());
  }

  saveUserSettingsForUser(userName: string, userSettings: UserSettings) {
    return Observable.of(UserSettingsServiceMock.getUserSetting());
  }

  getUserSettingsForJar(userName: string) {
    let userSettingsForJar: string = '-bw false -ps s -pc white';
    return Observable.of(userSettingsForJar);
  }

  getUserSettingsForElectron(username: string): Observable<string> {
    let userSettingsForElectron: string = 'b g';
    return Observable.of(userSettingsForElectron);
  }

  mapDeviceType(deviceType: DeviceType): string {
    return 'MOUSE';
  }
}
