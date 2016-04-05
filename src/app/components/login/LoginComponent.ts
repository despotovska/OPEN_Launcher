import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

import {UserService} from '../../shared/services/UserService';
import {AuthService} from '../../shared/services/AuthService';
import {AlertingService} from '../alerting/AlertingService';
import {User} from '../../shared/models/User';
import {UsersFilter} from '../../shared/filters/UsersFilter';

@Component({
  selector: 'login',
  directives: [RouterLink],
  pipes: [UsersFilter],
  templateUrl: `./app/components/login/login.html`
})
export class LoginComponent {
  public allUsers: User[] = new Array<User>();
  public selectedUser: User = new User();
  public usernameFilter = '';

  constructor(
    private alertingService: AlertingService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {

    this.setAllUsers();
  }

  setAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe(data => this.allUsers = data,
      err => this.alertingService.addDanger('Грешка при вчитување на корисниците.'));
  }

  deleteUser(): void {
    this.userService.deleteUser(this.selectedUser.name)
      .subscribe(data => {
        this.allUsers = data;
        this.selectedUser = new User();
        this.alertingService.addSuccess('Профилот е успешно избришан.');
      }, err => {
        this.alertingService.addDanger('Грешка при бришење на профилот.');
      });
  }

  deleteCancelled(): void {
    this.alertingService.addInfo('Бришењето е откажано.');
  }

  login(): void {
    if (!this.authService.login(this.selectedUser.name)) {
      this.alertingService.addDanger('Корисникот не е валиден.');
    } else {
      this.router.navigate(['/Home']);
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  shouldApplySelectedUserLayout(user: User): boolean {
    return this.selectedUser === user;
  }
}
