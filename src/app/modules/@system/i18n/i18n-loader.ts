import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { fr } from '../../../../assets/i18n/fr';

const langs: any = {
  fr
};

export class I18nLoader extends TranslateLoader {

  public getTranslation(lang: string): Observable<any> {
    return of(langs[lang]);
  }
}
