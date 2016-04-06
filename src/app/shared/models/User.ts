import {UserSettings} from './UserSettings';

//Class that represents the user entity from db
export class User {
  public name: string;
  public profileImg: string;
  public userSettings: UserSettings;

  constructor() {
    this.userSettings = new UserSettings();
  }
}

export class Users {
  public users: User[] = new Array<User>();

  constructor(objects) {
    for (var key in objects) {
      var obj = objects[key];
      var user = new User();

      for (var prop in obj) {
        user[prop] = obj[prop];
      }

      this.users.push(user);
    }
  }
}
