import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingHttpInterceptorService } from './loading-http-interceptor.service';

@Injectable()
export class LoadingHttpInterceptor implements HttpInterceptor {
  private readonly loadingHttpInterceptorService = inject(LoadingHttpInterceptorService);
  private counterRequest = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingHttpInterceptorService.loading$$.next(true);
    this.counterRequest++;
    return next.handle(request).pipe(
      finalize(() => {
        if (--this.counterRequest === 0) {
          this.loadingHttpInterceptorService.loading$$.next(false);
        }
      })
    );
  }
}
