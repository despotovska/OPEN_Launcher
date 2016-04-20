import {Injectable, bind} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from '../../shared/services/GlobalService';

export interface IGameLauncherService{
    loadGame(userSettings, selectedGame): any;
    isGameStarted();
}

@Injectable()
export class GameLauncherService implements IGameLauncherService {
    constructor(private http: Http, private globalService: GlobalService) {}
    
    loadGame(selectedGame, userSettings) {
        return this.http.get(this.globalService.URL_STARTGAME(selectedGame, userSettings));
    }
    
    isGameStarted(){
        return this.http.get(this.globalService.URL_IS_GAMESTARTED).map(res => {
            var isGameStarted: boolean = JSON.parse(res.json());
            return isGameStarted;
        });
    }
}

export var gameLauncherServiceInjectables: Array<any> = [bind(GameLauncherService).toClass(GameLauncherService)];