import { HttpClient } from '@angular/common/http';
import { inject, Injectable, isDevMode, NgModule } from '@angular/core';
import { provideTransloco, Translation, TranslocoLoader, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { lastValueFrom, Observable } from 'rxjs';
import { Language } from './shared/enums/language.enum';

// FUNÇÃO QUE CARREGA OS IDIOMAS ANTES DE INICIAR A APLICAÇÃO (ESTÁ SENDO USADA NO APP MODULE)
export function preloadLanguage(transloco: TranslocoService): () => Promise<unknown> {
  return () => {
    const promiseLanguage = [
      lastValueFrom(transloco.load(Language.PT)),
      lastValueFrom(transloco.load(Language.EN)),
      lastValueFrom(transloco.load(Language.ES)),
    ];

    return new Promise(resolve => {
      Promise.all(promiseLanguage).then(() => {
        resolve(null);
      });
    });
  };
}

// LOADER DE TRADUÇÃO (ONDE É DEFINIDO O CAMINHO DOS ARQUIVOS DE TRADUÇÃO - ESSA ABORDAGEM PERMITE QUE FRONT E BACK CONSIGAM COMPARTILHAR OS ARQUIVOS DE TRADUÇÃO)
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  getTranslation(lang: string): Observable<Translation> {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

// MÓDULO DE TRADUÇÃO (ONDE É DEFINIDO O IDIOMA PADRÃO ,OS IDIOMAS DISPONÍVEIS E SE SERÁ POSSÍVEL ALTERAR O IDIOMA EM TEMPO DE EXECUÇÃO)
@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: [Language.PT, Language.EN, Language.ES],
        defaultLang: Language.PT,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
})
export class TranslocoRootModule {}
