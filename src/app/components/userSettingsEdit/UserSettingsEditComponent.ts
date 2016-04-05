import {Input, Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {AuthService} from '../../shared/services/AuthService';
import {UserSettingsComponent} from '../userSettings/UserSettingsComponent';
import {UserSettings} from '../../shared/models/UserSettings';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';
import {AlertingService} from '../alerting/AlertingService';

@Component({
  directives: [RouterLink, UserSettingsComponent],
  templateUrl: './app/components/userSettingsEdit/userSettingsEdit.html'
})
export class UserSettingsEditComponent {
  public userName: string;
  public userSettings: UserSettings;

  constructor(
    private alertingService: AlertingService,
    private authService: AuthService,
    private userSettingsService: UserSettingsService) {

    this.userName = authService.getUser();
    this.userSettingsService.getUserSettingsFor(this.userName)
      .subscribe(data => this.userSettings = data);
  }

  saveUserSettings(): void {
    this.userSettingsService.saveUserSettingsForUser(this.userName, this.userSettings)
      .subscribe(data => {
        this.alertingService.addSuccess('Корисничките подесувања се успешно зачувани.');
      }, err => {
        this.alertingService.addDanger('Корисничките подесувања не се успешно зачувани.');
      });
  }
}
