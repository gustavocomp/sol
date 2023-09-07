import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SignInComponent } from 'src/app/domain/auth/pages/sign-in/sign-in.component';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { getTranslocoModule } from 'src/app/transloco-testing.module';

import { InitialFocusDirective } from './initial-focus.directive';

describe(`${InitialFocusDirective.name}`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SignInComponent, InitialFocusDirective, ToastrModule.forRoot({}), getTranslocoModule(), BrowserAnimationsModule],
      providers: [ToastrService, NotificationsService],
    });
  });

  it(`${InitialFocusDirective.name} - should focus on the element when autoFocus is true`, () => {
    const fixture: ComponentFixture<SignInComponent> = TestBed.createComponent(SignInComponent);
    const directive = fixture.debugElement.query(By.directive(InitialFocusDirective));
    const inputElement: HTMLInputElement = directive.nativeElement;
    const inputElementDocumentActive = document.getElementsByClassName('mat-mdc-input-element')[0] as HTMLInputElement;

    fixture.detectChanges();

    expect(inputElement).toEqual(inputElementDocumentActive);
    expect(inputElement.select).toBeDefined();
  });
});
