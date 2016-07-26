import {Injectable, bind} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from '../../shared/services/GlobalService';

export interface IGameLauncherService {
  loadGame(startCommand): void;
  isGameStarted(): Observable<boolean>;
}

@Injectable()
export class GameLauncherService implements IGameLauncherService {
  constructor(private http: Http, private globalService: GlobalService) { }

  loadGame(startCommand): void {
    this.http.get(this.globalService.URL_STARTGAME(startCommand)).subscribe();
  }

  isGameStarted(): Observable<boolean> {
    return this.http.get(this.globalService.URL_IS_GAMESTARTED).map(res => {
      let isGameStarted: boolean = JSON.parse(res.json());
      return isGameStarted;
    });
  }
}

export let gameLauncherServiceInjectables: Array<any> = [bind(GameLauncherService).toClass(GameLauncherService)];
