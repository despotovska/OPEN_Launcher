import {Component, Injector} from 'angular2/core';
import {CanActivate} from 'angular2/router';

import {AuthService} from '../../shared/services/AuthService';

@Component({
  selector: 'home',
  templateUrl: `./app/components/home/home.html`
})
@CanActivate(
  (nextInstr: any, currInstr: any) => {
    let injector: any = Injector.resolveAndCreate([AuthService]);
    let authService: AuthService = injector.get(AuthService);
    return authService.isLogged();
  }
)
export class HomeComponent {
  public zapoznajSeSoKomp: string = 'Причина и последица';
  public ucimeSoKomp: Array<string> = ['Парови', 'Кој се крие', 'Сложувалка', 'Јас и мојот дом', 'Приказна'];
}
