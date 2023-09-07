import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingHttpInterceptorService {
  loading$$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loading$$.asObservable();
}
