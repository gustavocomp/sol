import { ModuleWithProviders } from '@angular/core';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
import en from '../assets/i18n/en.json';
import es from '../assets/i18n/es.json';
import pt from '../assets/i18n/pt.json';
import { Language } from './shared/enums/language.enum';

export function getTranslocoModule(options: TranslocoTestingOptions = {}): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({
    langs: { en, es, pt },
    translocoConfig: {
      availableLangs: [Language.PT, Language.EN, Language.ES],
      defaultLang: Language.PT,
    },
    preloadLangs: true,
    ...options,
  });
}
