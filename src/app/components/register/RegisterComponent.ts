import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from 'angular2/common';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {ImagesService} from '../../shared/services/ImagesService';
import {UserService} from '../../shared/services/UserService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../../shared/services/AlertingService';

import {UserSettingsComponent} from '../userSettings/UserSettingsComponent';
import {User} from '../../shared/models/User';
import {PointerType, PointerSize, PointerColor, BackgroundColor, DeviceType} from '../../shared/enums/UserSettingsEnums';

@Component({
  directives: [FORM_DIRECTIVES, RouterLink, UserSettingsComponent],
  templateUrl: './app/components/register/register.html',
  pipes: [TranslatePipe]
})
export class RegisterComponent {
  public user: User;
  public registerForm: ControlGroup;
  public allImages: string[] = new Array<string>();

  constructor(
    private alertingService: AlertingService,
    private imagesService: ImagesService,
    private userService: UserService,
    private userValidationService: UserValidationService,
    private router: Router,
    private fb: FormBuilder) {

    this.user = this.getInitialUser();

    this.registerForm = fb.group({
      'name': ['', Validators.required]
    });

    this.setAvailableImages();
  }

  setAvailableImages(): void {
    this.imagesService.getProfileImages()
      .subscribe(
      data => this.allImages = data,
      err => this.alertingService.addDanger('LOAD_AVATARS_ERROR_MESSAGE'));
  }

  onSelect(img: string): void {
    this.user.profileImg = img;
  }

  onSubmit(): void {
    this.userValidationService.isValid(this.user)
      .subscribe(validationResponse => {
        if (!validationResponse.isValid) {
          this.alertingService.addDanger(validationResponse.message);
        } else {
          this.userService.addUser(this.user)
            .subscribe(data => {
              this.alertingService.addSuccess('ADD_USER_SUCCESS_MESSAGE');
              this.router.navigate(['/Login']);
            }, err => this.alertingService.addDanger('ADD_USER_ERROR_MESSAGE'));
        }
      }
      );
  }

  private getInitialUser(): User {
    let result = new User();
    result.profileImg = './assets/images/avatars/default.jpg';
    result.userSettings.backgroundColor = BackgroundColor.InColor;
    result.userSettings.pointerType = PointerType.Hand;
    result.userSettings.pointerSize = PointerSize.Small;
    result.userSettings.pointerColor = PointerColor.White;
    result.userSettings.deviceType = DeviceType.Mouse;
    return result;
  }
}
