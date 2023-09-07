import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MASKS } from '@shared/constants/mask.constants';
import { Countries, DialogUserType, Professions } from '@shared/enums/users.enums';
import { DialogForm } from '@shared/models/admin/admin-dialog';
import { User } from '@shared/models/admin/admin.model';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { CustomValidators } from '@shared/validators/custom.validators';
import { ConfirmDialogService } from '@widget/components/confirm-dialog/confirm-dialog.service';
import { DialogTemplateComponent } from '@widget/components/dialog-template/dialog-template.component';
import { DialogTemplateConfig } from '@widget/components/dialog-template/dialog-template.model';
import { InitialFocusDirective } from '@widget/directives/initial-focus.directive';
import { NgxMaskModule } from 'ngx-mask';

@Component({
  selector: 'sol-edit-dialog',
  templateUrl: './adm-dialog.component.html',
  styleUrls: ['./adm-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogTemplateComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    InitialFocusDirective,
    ReactiveFormsModule,
    NgxMaskModule,
    TranslocoModule,
  ],
})
export class AdmDialogComponent implements OnInit {
  @ViewChild('autocomplete') input: ElementRef<HTMLInputElement>;
  private readonly destroyRef = inject(DestroyRef);
  private readonly translocoService = inject(TranslocoService);
  private readonly confirmDialogService = inject(ConfirmDialogService);
  private readonly notificationsService = inject(NotificationsService);
  private readonly matDialogRef = inject<MatDialogRef<AdmDialogComponent>>(MatDialogRef);

  protected readonly data: { user: User; type: DialogUserType } = inject(MAT_DIALOG_DATA);
  protected readonly MASKS = MASKS;

  protected usersCountries = Object.entries(Countries).map(([key, value]) => ({ key, value }));
  protected usersProfessions = Object.entries(Professions).map(([key, value]) => ({ key, value }));

  protected dialogTemplateConfig: DialogTemplateConfig;
  protected filteredUsersProfessions: string[];
  protected form: FormGroup<DialogForm>;

  ngOnInit(): void {
    this.initFilter();
    this.buildForm();
    this.buildDialogTemplateConfig();
    this.oberverForm();
    this.tryPatchValue();
  }

  private buildForm(): void {
    this.form = new FormGroup<DialogForm>({
      email: new FormControl(null, [Validators.required, CustomValidators.email]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      cpf: new FormControl(null, [Validators.required, CustomValidators.isCPF]),
      country: new FormControl(null, [Validators.required]),
      profession: new FormControl(null, [Validators.required]),
      dateBirth: new FormControl(null),
      married: new FormControl(true),
    });
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredUsersProfessions = this.usersProfessions
      .map(profession => profession.value)
      .filter(profession => profession.toLowerCase().includes(filterValue));
  }

  private initFilter(): void {
    this.filteredUsersProfessions = this.usersProfessions.map(profession => profession.value).slice();
  }

  private oberverForm(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.dialogTemplateConfig.actionButtons[1].disabled = this.form.invalid;
    });
  }

  private tryPatchValue(): void {
    if (this.data.user) {
      this.form.patchValue({
        email: this.data.user.email,
        name: this.data.user.name,
        cpf: '12312312387',
        country: Countries.FR,
        dateBirth: new Date(),
        married: false,
        profession: Professions.DEV,
      });
    }
  }

  private onCancel(): void {
    this.confirmDialogService
      .confirm(this.translocoService.translate('LABELS.MSG0030'))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: boolean) => {
        if (response) {
          this.matDialogRef.close();
        }
      });
  }

  private onSaved(): void {
    if (!this.form.valid) return;

    const message = this.data.type === DialogUserType.CREATE ? 'SUCCESS.MSG0003' : 'SUCCESS.MSG0004';
    this.notificationsService.info(this.translocoService.translate(message));
    this.matDialogRef.close(this.form.value);
  }

  private buildDialogTemplateConfig(): void {
    this.dialogTemplateConfig = {
      title: 'LABELS.MSG0029',
      close: () => this.matDialogRef.close(),
      actionButtons: [
        {
          label: 'LABELS.MSG0026',
          color: 'warn',
          type: 'stroked',
          disabled: false,
          onClick: this.onCancel.bind(this),
        },
        {
          label: 'LABELS.MSG0027',
          color: 'primary',
          type: 'flat',
          disabled: true,
          onClick: this.onSaved.bind(this),
        },
      ],
    };
  }
}
