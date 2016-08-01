import {Component, OnInit} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {UserService} from '../../shared/services/UserService';
import {AuthService} from '../../shared/services/AuthService';
import {AlertingService} from '../../shared/services/AlertingService';

import {User} from '../../shared/models/User';
import {UsersPipe} from '../../shared/pipes/UsersPipe';

@Component({
  selector: 'login',
  directives: [RouterLink],
  pipes: [UsersPipe, TranslatePipe],
  templateUrl: './app/components/login/login.html'
})
export class LoginComponent implements OnInit {
  public allUsers: User[] = new Array<User>();
  public selectedUser: User = new User();
  public query = '';

  constructor(
    private alertingService: AlertingService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {

    this.setAllUsers();
  }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.router.navigate(['Home']);
    }
  }

  setAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe(data => this.allUsers = data,
      err => this.alertingService.addDanger('LOAD_USERS_ERROR_MESSAGE'));
  }

  deleteUser(): void {
    this.userService.deleteUser(this.selectedUser.name)
      .subscribe(data => {
        this.allUsers = data;
        this.selectedUser = new User();
        this.alertingService.addSuccess('DELETE_USER_SUCCESS_MESSAGE');
      }, err => {
        this.alertingService.addDanger('DELETE_USER_ERROR_MESSAGE');
      });
  }

  deleteCancelled(): void {
    this.alertingService.addInfo('DELETE_USER_CANCELED_MESSAGE');
  }

  login(): void {
    this.authService.login(this.selectedUser.name).subscribe((success) => {
      if (success) {
        this.router.navigate(['/Home']);
      } else {
        this.alertingService.addDanger('INVALID_USER_MESSAGE');
      }
    });
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  shouldApplySelectedUserLayout(user: User): boolean {
    return this.selectedUser === user;
  }
}
