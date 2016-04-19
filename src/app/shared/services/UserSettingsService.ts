import {Injectable, bind} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';
import {UserSettings} from '../models/UserSettings';
import {PointerType, PointerSize, PointerColor, BackgroundColor } from '../enums/UserSettingsEnums';

export interface IUserSettingsService {
  getUserSettingsFor(username: string): Observable<UserSettings>;
  getUserSettingsForJar(username: string): Observable<string>;
  saveUserSettingsForUser(username: string, userSettings: UserSettings): Observable<UserSettings>;
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

  getUserSettingsForJar(username: string): Observable<string> {
    let mapUserSettings: string = '';
    let userSettingsData: UserSettings;

    this.getUserSettingsFor(username).subscribe(data => { userSettingsData = data; });
    return this.http.get(this.globalService.URL_GET_USERSETTINGS(username))
      .map(res => {
        let userSettings: UserSettings = res.json();

        (userSettings.backgroundColor === BackgroundColor.InColor) ? mapUserSettings = ' -bw false' : mapUserSettings = ' -bw true';
        (userSettings.pointerSize === PointerSize.Small) ? mapUserSettings += ' -ps s' : mapUserSettings += ' -ps m';
        (userSettings.pointerColor === PointerColor.White) ? mapUserSettings += ' -pc white'
          : (userSettings.pointerColor === PointerColor.Yellow) ? mapUserSettings += ' -pc yellow'
            : (userSettings.pointerColor === PointerColor.Green) ? mapUserSettings += ' -pc green'
              : (userSettings.pointerColor === PointerColor.Blue) ? mapUserSettings += ' -pc blue'
                : (userSettings.pointerColor === PointerColor.Red) ? mapUserSettings += ' -pc red'
                  : mapUserSettings += ' -pc white';
        return mapUserSettings;
      });
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
