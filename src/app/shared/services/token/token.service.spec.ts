import { TestBed } from '@angular/core/testing';
import { MOCK_SIGN_IN_FORM } from '../../mock/sign-in/sign-in.mock';
import { TokenService } from './token.service';

describe(`${TokenService.name}`, () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it(`${TokenService.prototype.decodeToken.name} - should decoded token`, () => {
    const email = service.decodeToken(MOCK_SIGN_IN_FORM.tokenJWT)['email'];
    expect(email).toEqual('john.doe@sol.com');
  });
});
