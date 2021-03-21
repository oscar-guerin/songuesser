import { LOCALE_ID, NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DynamicLocaleId } from './i18n/dynamic-locale-id';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { I18nLoader } from './i18n/i18n-loader';
import { indexOf } from 'lodash';
import * as dayjs from 'dayjs';

registerLocaleData(localeFr);
registerLocaleData(localeEn);

const SERVICES: Provider[] = [
  AuthService
];

const GUARDS: Provider[] = [
  AuthGuard
];

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: I18nLoader
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  declarations: [],
  providers: [
    ...SERVICES,
    ...GUARDS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useClass: DynamicLocaleId
    },
  ],
})
export class SystemModule {

  public constructor(@Optional() @SkipSelf() parentModule: SystemModule, translateService: TranslateService) {
    if (parentModule) {
      throw new Error(
        'SystemModule is already loaded. Import it in the AppModule only');
    }

    const defaultLanguages: string = 'fr';
    const languages: string[] = ['fr'];

    translateService.addLangs(languages);
    translateService.setDefaultLang(defaultLanguages);

    let browserLang: string = translateService.getBrowserLang();

    if (indexOf(languages, browserLang) === -1) {
      browserLang = defaultLanguages;
    }

    translateService.use(browserLang);
    dayjs.locale(translateService.currentLang);
  }
}
