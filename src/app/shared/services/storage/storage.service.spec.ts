import { TestBed } from '@angular/core/testing';
import { Language } from 'src/app/shared/enums/language.enum';
import { MOCK_SIGN_IN_FORM } from '../../mock/sign-in/sign-in.mock';
import { BrowserStorageKey } from './storage.model';
import { StorageService } from './storage.service';

describe(`${StorageService.name}`, () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it(`${StorageService.name}  - should set, get, remove and clear local storage`, () => {
    service.setItem(BrowserStorageKey.SolToken, MOCK_SIGN_IN_FORM.tokenJWT);
    service.setItem(BrowserStorageKey.SolLanguage, Language.EN);

    expect(service.getItem(BrowserStorageKey.SolToken)).toEqual(MOCK_SIGN_IN_FORM.tokenJWT);

    service.removeItem(BrowserStorageKey.SolLanguage);
    expect(service.getItem(BrowserStorageKey.SolLanguage)).toBeNull();

    service.clear();
    expect(service.getItem(BrowserStorageKey.SolToken)).toBeNull();

    service.setItem(BrowserStorageKey.SolToken, MOCK_SIGN_IN_FORM.tokenJWT);
    service.setItem(BrowserStorageKey.SolLanguage, Language.PT);

    service.removeAllMyItems();
    expect(service.getItem(BrowserStorageKey.SolToken) && service.getItem(BrowserStorageKey.SolLanguage)).toBeNull();
  });
});
