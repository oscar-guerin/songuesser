import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class DynamicLocaleId extends String {

  public constructor(private readonly translateService: TranslateService) {
    super();
  }

  public toString(): string {
    return this.translateService.currentLang;
  }
}
