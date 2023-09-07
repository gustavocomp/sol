import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserStorageKey } from 'src/app/shared/services/storage/storage.model';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { Language } from './../../../shared/enums/language.enum';
import { ChangeLanguageComponent } from './change-language.component';

describe(`${ChangeLanguageComponent.name}`, () => {
  let component: ChangeLanguageComponent;
  let fixture: ComponentFixture<ChangeLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeLanguageComponent, getTranslocoModule(), BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${ChangeLanguageComponent.name} - should create component`, () => {
    expect(component).toBeTruthy();
  });

  it(`${ChangeLanguageComponent.name} - should set language and storage on setLanguage`, () => {
    const translocoServiceSpy = spyOn(component['translocoService'], 'setActiveLang');
    const storageServiceSpy = spyOn(component['storageService'], 'setItem');

    const language = Language.PT;
    component.setLanguage(language);

    expect(translocoServiceSpy).toHaveBeenCalledWith(language);
    expect(storageServiceSpy).toHaveBeenCalledWith(BrowserStorageKey.SolLanguage, language);
  });
});
