import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
@Component({
  selector: 'sol-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, TranslocoModule, MatButtonModule],
})
export class ConfirmDialogComponent {
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly matDialogData = inject(MAT_DIALOG_DATA);
  message = this.matDialogData;
  response(response: boolean): void {
    this.matDialogRef.close(response);
  }
}
