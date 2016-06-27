import 'bootstrap/dist/css/bootstrap.css';
require('./assets/css/site.css');

import {provide, Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {
  Router,
  RouteConfig,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF} from 'angular2/router';

/*
 * Providers
 */
import {HTTP_PROVIDERS} from 'angular2/http';
import { AUTH_PROVIDERS } from './app/shared/services/AuthService';

/*
 * Components
 */
import {HomeComponent} from './app/components/home/HomeComponent';
import {UploadPictureComponent} from './app/components/upload/UploadPictureComponent';
import {RegisterComponent} from './app/components/register/RegisterComponent';
import {LoginComponent} from './app/components/login/LoginComponent';
import {AlertingComponent} from './app/components/alerting/AlertingComponent';
import {UserSettingsEditComponent} from './app/components/userSettingsEdit/UserSettingsEditComponent';
import {NotFoundComponent} from './app/components/notfound/NotFoundComponent';

/*
 * The App Injectables
 */
import {appInjector} from './appInjector';

/*
 * Injectables
 */
import { servicesInjectables } from './app/shared/services/services';
import { AuthService } from './app/shared/services/AuthService';

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
  { path: '/404', name: 'NotFound', component: NotFoundComponent }, ,
  { path: '/*path', redirectTo: ['NotFound'] }
])
export class App {
  constructor(private authService: AuthService, private router: Router) { }

  isUserLogged(): boolean {
    return this.authService.isLogged();
  }

  logout(): void {
    this.authService.logout().subscribe((success) => {
      if (success) {
        this.router.navigate(['/Login']);
      }
    });
  }
}

bootstrap(App, [
  HTTP_PROVIDERS,
  servicesInjectables,
  AUTH_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(LocationStrategy, { useClass: HashLocationStrategy })])
  .then((appRef) => {
    appInjector(appRef.injector);
  });
