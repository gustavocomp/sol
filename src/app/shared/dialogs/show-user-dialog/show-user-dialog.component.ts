import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { User } from '@shared/models/admin/admin.model';
import { DialogTemplateComponent } from '@widget/components/dialog-template/dialog-template.component';
import { DialogTemplateConfig } from '@widget/components/dialog-template/dialog-template.model';

@Component({
  selector: 'sol-show-user-dialog',
  templateUrl: './show-user-dialog.component.html',
  styleUrls: ['./show-user-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, DialogTemplateComponent, TranslocoModule],
})
export class ShowUserDialogComponent {
  private readonly matDialogRef = inject<MatDialogRef<ShowUserDialogComponent>>(MatDialogRef);
  readonly data: User = inject(MAT_DIALOG_DATA);

  dialogTemplateConfig: DialogTemplateConfig = {
    title: 'LABELS.MSG0020',
    colorToolbar: 'accent',
    close: (): void => this.matDialogRef.close(),
    actionButtons: [
      {
        color: 'accent',
        label: 'LABELS.MSG0002',
        onClick: (): void => this.matDialogRef.close(),
        disabled: false,
        type: 'flat',
      },
    ],
  };
}
