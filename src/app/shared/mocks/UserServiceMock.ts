import {Observable} from 'rxjs/Rx';

import {User} from '../../shared/models/User';
import {IUserService} from '../services/UserService';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';

export class UserServiceMock implements IUserService {
  static getTestUser(name: string) {
    let user = new User();
    user.name = name;
    user.profileImg = 'profileImg';
    return user;
  }

  static getAllUsers(user: User): User[] {
    let allUsers: User[] = new Array<User>();
    allUsers[0] = UserServiceMock.getTestUser('user1');
    allUsers[1] = UserServiceMock.getTestUser('user2');
    allUsers[2] = user;
    return allUsers;
  }

  static getValidUserWithSettings(username: string): User {
    let user: User = new User();
    user.profileImg = './assets/images/avatars/devojce.jpg';
    user.name = username;
    user.userSettings.backgroundColor = BackgroundColor.InColor;
    user.userSettings.pointerType = PointerType.Hand;
    user.userSettings.pointerSize = PointerSize.Small;
    user.userSettings.pointerColor = PointerColor.White;
    return user;
  }

  addUser(user: User) {
    return Observable.of(JSON.parse(''));
  }

  deleteUser(name) {
    let allUsers: User[] = new Array<User>();
    allUsers[0] = UserServiceMock.getTestUser('user1');
    return Observable.of(allUsers);
  }

  getAllUsers(): Observable<User[]> {
    let allUsers: User[] = new Array<User>();
    let users = '[{"name": "user1"}, {"name": "user2"}]';
    let obj = JSON.parse(users);
    return Observable.of(obj);
  }

  getUserByName(username: string): Observable<User[]> {
    return this.getAllUsers();
  }
}
