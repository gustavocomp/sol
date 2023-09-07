import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com';
  //ALTERAR PARA O ENDEREÇO DO BACKEND (ANGULAR 16 NÃO POSSUI ARQUIVO DE ENVIRONMENT)

  protected get<R>(route: string): Observable<R> {
    return this.httpClient.get<R>(`${this.BASE_URL}/${route}`);
  }

  protected post<R, B>(route: string, body: B): Observable<R> {
    return this.httpClient.post<R>(`${this.BASE_URL}/${route}`, body);
  }

  protected put<R, B>(route: string, body: B): Observable<R> {
    return this.httpClient.put<R>(`${this.BASE_URL}/${route}`, body);
  }

  protected patchQueryString<R>(route: string): Observable<R> {
    return this.httpClient.patch<R>(`${this.BASE_URL}/${route}`, null);
  }

  protected delete<R>(route: string): Observable<R> {
    return this.httpClient.delete<R>(`${this.BASE_URL}/${route}`);
  }
}
