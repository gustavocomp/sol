import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
  private readonly matDialog = inject(MatDialog);
  confirm(message: string): Observable<boolean> {
    return this.matDialog.open(ConfirmDialogComponent, { data: message, autoFocus: false }).afterClosed();
  }
}
