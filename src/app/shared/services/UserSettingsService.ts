import {Injectable, bind} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';
import {UserSettings} from '../models/UserSettings';
import {PointerType, PointerSize, PointerColor, BackgroundColor, DeviceType} from '../enums/UserSettingsEnums';

export interface IUserSettingsService {
  getUserSettingsFor(username: string): Observable<UserSettings>;
  getUserSettingsForJar(username: string): Observable<string>;
  getUserSettingsForElectron(username: string): Observable<string>;
  saveUserSettingsForUser(username: string, userSettings: UserSettings): Observable<UserSettings>;
  mapDeviceType(deviceType: number): string;
}

@Injectable()
export class UserSettingsService implements IUserSettingsService {
  constructor(private http: Http, private globalService: GlobalService) { }

  getUserSettingsFor(username: string): Observable<UserSettings> {
    return this.http.get(this.globalService.URL_GET_USERSETTINGS(username))
      .map(res => {
        let userSettings: UserSettings = res.json();
        return userSettings;
      });
  }

  getUserSettingsForElectron(username: string): Observable<string> {
    return this.http.get(this.globalService.URL_GET_USERSETTINGS(username))
      .map(res => {
        let userSettings: UserSettings = res.json();
        let mapUserSettings = ' ' + this.mapPointerSize(userSettings.pointerSize);
        mapUserSettings += ' ' + this.mapPointerColor(userSettings.pointerColor);
        return mapUserSettings;
      });
  }

  getUserSettingsForJar(username: string): Observable<string> {
    return this.http.get(this.globalService.URL_GET_USERSETTINGS(username))
      .map(res => {
        let userSettings: UserSettings = res.json();
        let mapUserSettings = ' -bw ' + (userSettings.backgroundColor === BackgroundColor.BlackAndWhite);
        mapUserSettings += ' -ps ' + this.mapPointerSize(userSettings.pointerSize);
        mapUserSettings += ' -pc ' + this.mapPointerColor(userSettings.pointerColor);
        return mapUserSettings;
      });
  }

  mapPointerSize(pointerSize: number): string {
    return (pointerSize === PointerSize.Small) ? 's' : 'm';
  }

  mapPointerColor(pointerColor: number): string {
    switch (pointerColor) {
      case PointerColor.White:
        return 'white';
      case PointerColor.Yellow:
        return 'yellow';
      case PointerColor.Green:
        return 'green';
      case PointerColor.Blue:
        return 'blue';
      case PointerColor.Red:
        return 'red';
      default:
        return 'white';
    }
  }

  mapDeviceType(deviceType: number): string {
    switch (deviceType) {
      case DeviceType.Mouse:
        return 'MOUSE';
      case DeviceType.Touchscreen:
        return 'TOUCHSCREEN';
      case DeviceType.Trackball:
        return 'TRACKBALL';
      case DeviceType.Joystick:
        return 'JOYSTICK';
      case DeviceType.Key:
        return 'KEY';
      case DeviceType.KeyTrackball:
        return 'KEY_AND_TRACKBALL';
      case DeviceType.KeyJoystick:
        return 'KEY_AND_JOYSTICK';
      default:
        return 'MOUSE';
    }
  }

  saveUserSettingsForUser(username: string, userSettings: UserSettings): Observable<UserSettings> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.globalService.URL_SAVE_USERSETTINGS(username),
      JSON.stringify(userSettings),
      { headers: headers })
      .map(res => {
        let settings: UserSettings = res.json();
        return settings;
      });
  }
}

export let userSettingsServiceInjectables: Array<any> = [
  bind(UserSettingsService).toClass(UserSettingsService)
];
