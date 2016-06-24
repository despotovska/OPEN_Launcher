import {Injectable, bind} from 'angular2/core';

const URL: string = 'http://localhost:3000';

@Injectable()
export class GlobalService {
  URL_UPLOAD_PICTURE: string = URL + '/api/upload';
  URL_GETALLUSERS: string = URL + '/api/getAllUsers';
  URL_ADDUSER: string = URL + '/api/addUser';
  URL_GETPROFILE_IMAGES: string = URL + '/api/GetProfileImages/';
  URL_GETPOINTER_IMAGES: string = URL + '/api/GetPointerImages/';
  URL_IS_GAMESTARTED: string = URL + '/api/isGameStarted';
  URL_LOGOUT: string = URL + '/api/logout/';

  URL_GETUSER(username: string): string {
    return URL + '/api/getAllUsers/' + username;
  }

  URL_DELETEUSER(username: string): string {
    return URL + '/api/deleteUser/' + username;
  }

  URL_GET_USERSETTINGS(username: string): string {
    return URL + '/api/getUserSettings/' + username;
  }

  URL_SAVE_USERSETTINGS(username: string): string {
    return URL + '/api/saveUserSettings/' + username;
  }

  URL_IS_EXISTINGUSER(username: string): string {
    return URL + '/api/isExistingUser/' + username;
  }

  URL_STARTGAME(startCommand: string): string {
    return URL + '/api/startGame?startCommand=' + startCommand;
  }

  URL_LOGIN(username: string): string {
    return URL + '/api/login/' + username;
  }
}

export let globalServiceInjectables: Array<any> = [
  bind(GlobalService).toClass(GlobalService)
];
