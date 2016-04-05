import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from 'angular2/common';

import {User} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserService} from '../../shared/services/UserService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../alerting/AlertingService';
import {UserSettingsComponent} from '../userSettings/UserSettingsComponent';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';

@Component({
  directives: [FORM_DIRECTIVES, RouterLink, UserSettingsComponent],
  templateUrl: './app/components/register/register.html'
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
      err => this.alertingService.addDanger('Грешка при вчитување на корисничките слики.'));
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
              this.alertingService.addSuccess('Успешно внесен корисник.');
              this.router.navigate(['/Login']);
            }, err => this.alertingService.addDanger('Грешка при внесување на корисник.'));
        }
      }
      );
  }

  private getInitialUser(): User {
    var result = new User();
    result.profileImg = './assets/images/avatars/default.jpg';
    result.userSettings.backgroundColor = BackgroundColor.InColor;
    result.userSettings.pointerType = PointerType.Hand;
    result.userSettings.pointerSize = PointerSize.Small;
    result.userSettings.pointerColor = PointerColor.White;
    return result;
  }
}
