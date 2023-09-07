import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  decodeToken(token: string): any {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  getTokenExpirationDate(token: string): Date | null {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.getTokenExpirationDate(token);
  }
}
