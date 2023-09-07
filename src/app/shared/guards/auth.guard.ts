import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BrowserStorageKey } from '../services/storage/storage.model';
import { StorageService } from '../services/storage/storage.service';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private readonly storageService = inject(StorageService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.storageService.getItem(BrowserStorageKey.SolToken) as string;

    const tokenData = this.tokenService.decodeToken(token);

    const isTokenData = tokenData !== null;

    !isTokenData && this.router.navigate(['/sign-in']);

    return isTokenData;
  }
}
