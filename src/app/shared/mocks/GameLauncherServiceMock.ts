import {Observable} from 'rxjs/Rx';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';

import {IGameLauncherService} from '../../components/home/GameLauncherService';

export class GameLauncherServiceMock implements IGameLauncherService {
  public static gameStarted: boolean = false;

  loadGame(startCommand) {
    return Observable.of(new Observable<Response>());
  }

  isGameStarted() {
    return Observable.of(GameLauncherServiceMock.gameStarted);
  }
}
