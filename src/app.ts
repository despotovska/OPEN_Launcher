import 'bootstrap/dist/css/bootstrap.css';
require('./assets/css/site.css');

import {provide, Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouterOutlet, LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

/*
 * Components
 */
import {HomeComponent} from './app/components/home/HomeComponent';
import {UploadPictureComponent} from './app/components/upload/UploadPictureComponent';
import {RegisterComponent} from './app/components/register/RegisterComponent';
import {LoginComponent} from './app/components/login/LoginComponent';
import {AlertingComponent} from './app/components/alerting/AlertingComponent';
import {UserSettingsEditComponent} from './app/components/userSettingsEdit/UserSettingsEditComponent';

/*
 * Injectables
 */
import { servicesInjectables } from './app/shared/services/services';
import { AuthService } from './app/shared/services/AuthService';


/*
 * Services
 */
import { AUTH_PROVIDERS } from './app/shared/services/AuthService';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES, AlertingComponent],
  templateUrl: `./app.html`
})

@RouteConfig([
  { path: '/', redirectTo: ['/Login'] },
  { path: '/home', component: HomeComponent, name: 'Home' },
  { path: '/uploadpicture', component: UploadPictureComponent, name: 'UploadPicture' },
  { path: '/register', component: RegisterComponent, name: 'Register' },
  { path: '/login', component: LoginComponent, name: 'Login' },
  { path: '/userSettingsEdit', component: UserSettingsEditComponent, name: 'UserSettingsEdit' },
])
export class App {
  constructor(private authService: AuthService) { }

  isUserLogged(): boolean {
    return this.authService.isLogged();
  }

  logout() {
    this.authService.logout();
  }
}

bootstrap(App, [servicesInjectables,
  AUTH_PROVIDERS, ROUTER_PROVIDERS, HTTP_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(LocationStrategy, { useClass: HashLocationStrategy })]);
