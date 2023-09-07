import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoService } from '@ngneat/transloco';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingHttpInterceptor } from './shared/interceptors/loading-http-interceptor/loading-http-interceptor';
import { LogHttpInterceptor } from './shared/interceptors/log-http-interceptor/log-http-interceptor';
import { TranslocoRootModule, preloadLanguage } from './transloco-root.module';
import { ConfirmDialogService } from './widget/components/confirm-dialog/confirm-dialog.service';
import { LoadingComponent } from './widget/components/loading/loading.component';

registerLocaleData(pt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ToastrModule.forRoot(),
    LoadingComponent,
    MatDialogModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    ConfirmDialogService,
    {
      provide: APP_INITIALIZER,
      useFactory: preloadLanguage,
      deps: [TranslocoService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingHttpInterceptor,
      multi: true,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
