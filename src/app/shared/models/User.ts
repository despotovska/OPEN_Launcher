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
