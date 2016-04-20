import {Observable} from 'rxjs/Rx';

import {IGameLauncherService} from '../../components/home/GameLauncherService';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
export class GameLauncherServiceMock implements IGameLauncherService {
    public static gameStarted: boolean = false;
        
    loadGame(selectedGame, userSettings) {
        return Observable.of(new Observable<Response>());
    }
    
    isGameStarted(){
        return Observable.of(GameLauncherServiceMock.gameStarted);
    }
}