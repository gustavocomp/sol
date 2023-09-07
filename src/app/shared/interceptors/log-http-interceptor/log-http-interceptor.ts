import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpMethod, LogHttpInterceptorService } from './log-http-interceptor.service';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  constructor(private readonly logHttpInterceptorService: LogHttpInterceptorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const path = request.url;
    const payload = request.body;
    const method = request.method as HttpMethod;
    const headers = request.headers;
    const time = new Date().getTime();

    return next.handle(request).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          const timeRequest = (new Date().getTime() - time) / 1000;
          const responseData = event.body;

          if (path.includes('/assets/i18n')) return;

          if (!isDevMode()) return;

          this.logHttpInterceptorService.logHttp(path, payload, responseData, method, headers, timeRequest);
        }
      })
    );
  }
}
