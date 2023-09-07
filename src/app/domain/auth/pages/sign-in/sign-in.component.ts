import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { ToastrModule } from 'ngx-toastr';
import { Language } from 'src/app/shared/enums/language.enum';
import { MOCK_SIGN_IN_FORM } from 'src/app/shared/mock/sign-in/sign-in.mock';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { BrowserStorageKey } from 'src/app/shared/services/storage/storage.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';

import { InitialFocusDirective } from 'src/app/widget/directives/initial-focus.directive';
import { SignInForm } from './../../../../shared/models/sign-in/sign-in.model';

@Component({
  selector: 'sol-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TranslocoModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    ToastrModule,
    InitialFocusDirective,
  ],
})
export class SignInComponent implements OnInit {
  private readonly translocoService = inject(TranslocoService);
  private readonly notificationsService = inject(NotificationsService);
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);

  signInForm: FormGroup<SignInForm>;
  showPassword = false;

  ngOnInit(): void {
    this.buildForm();
  }

  showPasswordToggle(event: PointerEvent | MouseEvent): void {
    event.stopPropagation();
    this.showPassword = !this.showPassword;
  }

  submitForm(): void {
    if (!this.signInForm.valid) return;

    const validCredentials =
      MOCK_SIGN_IN_FORM.email === this.signInForm.value.email && MOCK_SIGN_IN_FORM.password === this.signInForm.value.password;

    if (validCredentials) {
      this.notificationsService.success(this.translocoService.translate('SUCCESS.MSG0001'));

      this.setItensInLocalStorage();
      this.router.navigate(['/sol/dashboard']);
    } else {
      this.notificationsService.error(this.translocoService.translate('ERRORS.MSG0003'));
    }
  }

  private buildForm(): void {
    this.signInForm = new FormGroup<SignInForm>({
      email: new FormControl(null, [Validators.required, CustomValidators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  private setItensInLocalStorage(): void {
    this.storageService.setItem(BrowserStorageKey.SolToken, MOCK_SIGN_IN_FORM.tokenJWT);

    this.storageService.setItem(BrowserStorageKey.SolLanguage, this.translocoService.getActiveLang() as Language);
  }
}
