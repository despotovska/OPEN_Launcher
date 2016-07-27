import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/site.css';

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

import {
  TRANSLATE_PROVIDERS,
  TranslateService,
  TranslatePipe,
  TranslateLoader,
  TranslateStaticLoader} from 'ng2-translate/ng2-translate';

/*
 * Providers
 */
import { HTTP_PROVIDERS, Http } from 'angular2/http';
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
  pipes: [TranslatePipe],
  providers: [provide(TranslateLoader, {
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/translations/', '.json'),
    deps: [Http]
  }),
    TranslateService],
  templateUrl: './app.html'
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
  public languages: string[] = ['mk', 'en'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService) {

    translate.setDefaultLang(this.languages[0]);
    translate.use(this.languages[0]);
  }

  isUserLogged(): boolean {
    return this.authService.isLogged();
  }

  getLoggedUser(): string {
    return this.authService.getLoggedUser();
  }

  logout(): void {
    this.authService.logout().subscribe((success) => {
      if (success) {
        this.router.navigate(['/Login']);
      }
    });
  }

  setLanguage(language: string): void {
    this.translate.use(language);
  }

  shouldApplySelectedLanguageCss(language: string): boolean {
    return this.translate.currentLang === language;
  }
}

bootstrap(App, [
  HTTP_PROVIDERS,
  servicesInjectables,
  AUTH_PROVIDERS,
  TRANSLATE_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(LocationStrategy, { useClass: HashLocationStrategy })])
  .then((appRef) => {
    appInjector(appRef.injector);
  });
