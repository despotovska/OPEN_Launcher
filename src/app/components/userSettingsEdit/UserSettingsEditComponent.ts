import {Input, Component} from 'angular2/core';
import {ComponentInstruction, RouterLink, CanActivate} from 'angular2/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {UserSettingsComponent} from '../userSettings/UserSettingsComponent';

import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {AuthService, isLoggedIn} from '../../shared/services/AuthService';
import {AlertingService} from '../../shared/services/AlertingService';

import {UserSettings} from '../../shared/models/UserSettings';

@Component({
  directives: [RouterLink, UserSettingsComponent],
  templateUrl: './app/components/userSettingsEdit/userSettingsEdit.html',
  pipes: [TranslatePipe]
})
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return isLoggedIn(next, previous);
})
export class UserSettingsEditComponent {
  public userName: string;
  public userSettings: UserSettings;
  public userSettingsForJar: string;

  constructor(
    private alertingService: AlertingService,
    private authService: AuthService,
    private userSettingsService: UserSettingsService) {

    this.userName = authService.getLoggedUser();
    this.userSettingsService.getUserSettingsFor(this.userName)
      .subscribe(data => this.userSettings = data);
    this.userSettingsService.getUserSettingsForJar(this.userName)
      .subscribe(data => this.userSettingsForJar = data);
  }

  saveUserSettings(): void {
    this.userSettingsService.saveUserSettingsForUser(this.userName, this.userSettings)
      .subscribe(data => {
        this.alertingService.addSuccess('SAVE_USER_SETTINGS_SUCCESS_MESSAGE');
      }, err => {
        this.alertingService.addDanger('SAVE_USER_SETTINGS_ERROR_MESSAGE');
      });
  }
}
