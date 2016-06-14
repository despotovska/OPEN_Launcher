import {Injectable, bind} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from '../../shared/services/GlobalService';

export interface IGameLauncherService {
  loadGame(startCommand): any;
  isGameStarted();
}

@Injectable()
export class GameLauncherService implements IGameLauncherService {
  constructor(private http: Http, private globalService: GlobalService) { }

  loadGame(startCommand) {
    return this.http.get(this.globalService.URL_STARTGAME(startCommand));
  }

  isGameStarted() {
    return this.http.get(this.globalService.URL_IS_GAMESTARTED).map(res => {
      let isGameStarted: boolean = JSON.parse(res.json());
      return isGameStarted;
    });
  }
}

export let gameLauncherServiceInjectables: Array<any> = [bind(GameLauncherService).toClass(GameLauncherService)];
