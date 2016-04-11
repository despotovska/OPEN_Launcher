import {Injectable, bind} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';
import {UserSettings} from '../models/UserSettings';

export interface IUserSettingsService {
  getUserSettingsFor(username: string): Observable<UserSettings>;
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
