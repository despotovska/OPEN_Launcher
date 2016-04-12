import {Injectable, bind} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';
import {UserSettings} from '../models/UserSettings';

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
        var userSettings: UserSettings = res.json();
        return userSettings;
      });
  }

  getUserSettingsForJar(username: string): Observable<string> {
    var mapUserSettings: string = '';
    var userSettings: UserSettings;

    this.getUserSettingsFor(username).subscribe(data => { userSettings = data; });
    return this.http.get(this.globalService.URL_GET_USERSETTINGS(username))
      .map(res => {
        var userSettings: UserSettings = res.json();

        (userSettings.backgroundColor === 0) ? mapUserSettings = ' -bw false' : mapUserSettings = ' -bw true';
        (userSettings.pointerSize === 0) ? mapUserSettings += ' -ps s' : mapUserSettings += ' -ps m';
        (userSettings.pointerColor === 0) ? mapUserSettings += ' -pc white'
          : (userSettings.pointerColor === 1) ? mapUserSettings += ' -pc yellow'
            : (userSettings.pointerColor === 2) ? mapUserSettings += ' -pc green'
              : (userSettings.pointerColor === 3) ? mapUserSettings += ' -pc blue'
                : (userSettings.pointerColor === 4) ? mapUserSettings += ' -pc red'
                  : mapUserSettings += ' -pc white';
        return mapUserSettings;
      });
  }

  saveUserSettingsForUser(username: string, userSettings: UserSettings): Observable<UserSettings> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.globalService.URL_SAVE_USERSETTINGS(username),
      JSON.stringify(userSettings),
      { headers: headers })
      .map(res => {
        var userSettings: UserSettings = res.json();
        return userSettings;
      });
  }
}

export var userSettingsServiceInjectables: Array<any> = [
  bind(UserSettingsService).toClass(UserSettingsService)
];
