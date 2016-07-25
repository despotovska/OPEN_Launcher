import {Injectable, bind} from 'angular2/core';

const URL: string = 'http://localhost:3000/api/';

@Injectable()
export class GlobalService {
  URL_UPLOAD_PICTURE: string = URL + 'upload';
  URL_GETALLUSERS: string = URL + 'getUsers';
  URL_ADDUSER: string = URL + 'addUser';
  URL_GETPROFILE_IMAGES: string = URL + 'getProfileImages';
  URL_GETPOINTER_IMAGES: string = URL + 'getPointerImages';
  URL_IS_GAMESTARTED: string = URL + 'isGameStarted';
  URL_LOGOUT: string = URL + 'logout';

  URL_GETUSER(username: string): string {
    return URL + 'getUsers/' + username;
  }

  URL_DELETEUSER(username: string): string {
    return URL + 'deleteUser/' + username;
  }

  URL_GET_USERSETTINGS(username: string): string {
    return URL + 'getUserSettings/' + username;
  }

  URL_SAVE_USERSETTINGS(username: string): string {
    return URL + 'saveUserSettings/' + username;
  }

  URL_IS_EXISTINGUSER(username: string): string {
    return URL + 'isExistingUsername/' + username;
  }

  URL_STARTGAME(startCommand: string): string {
    return URL + 'startGame?startCommand=' + startCommand;
  }

  URL_LOGIN(username: string): string {
    return URL + 'login/' + username;
  }
}

export let globalServiceInjectables: Array<any> = [
  bind(GlobalService).toClass(GlobalService)
];
