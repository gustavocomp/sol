import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

import { AdmDialogComponent } from '@shared/dialogs/adm-dialog/adm-dialog.component';
import { DialogUserType } from '@shared/enums/users.enums';
import { BreakpointScreen, DialogScreenService } from '@shared/services/screen/dialog-screen.service';
import { User } from 'src/app/shared/models/admin/admin.model';
import { CustomTableData } from 'src/app/shared/models/table/table.model';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { ConfirmDialogService } from 'src/app/widget/components/confirm-dialog/confirm-dialog.service';
import { TableComponent } from 'src/app/widget/components/table/table.component';
import { TitlePageDefaultComponent } from 'src/app/widget/components/title-page-default/title-page-default.component';
import { AdminService } from './admin.service';
@Component({
  selector: 'sol-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    TitlePageDefaultComponent,
    TableComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AdminComponent implements OnInit {
  private readonly AdminService = inject(AdminService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmDialogService = inject(ConfirmDialogService);
  private readonly notificationsService = inject(NotificationsService);
  private readonly translocoService = inject(TranslocoService);
  private readonly matDialog = inject(MatDialog);
  private readonly dialogScreenService = inject(DialogScreenService);

  dataSource: MatTableDataSource<User>;
  readonly customTableData: CustomTableData = this.buildCustomTableData();

  ngOnInit(): void {
    this.getRandomUsers();
  }

  private edit(row: User): void {
    this.matDialog
      .open(AdmDialogComponent, {
        autoFocus: false,
        data: {
          user: row,
          type: DialogUserType.EDIT,
        },
        ...(this.dialogScreenService.getWidth() <= BreakpointScreen.SM && this.dialogScreenService.appendProperties),
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user: User) => {
        if (user) {
          const newDataSource = [...this.dataSource.data, user];
          this.dataSource = new MatTableDataSource<User>(newDataSource);
        }
      });
  }

  private change(row: User): void {
    console.log(row);
  }

  private delete(row: User): void {
    this.confirmDialogService
      .confirm(this.translocoService.translate('LABELS.MSG0025'))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: boolean) => {
        if (response) {
          const newDataSource = this.dataSource.data.filter(user => user.id !== row.id);
          this.dataSource = new MatTableDataSource<User>(newDataSource);
          this.notificationsService.info(this.translocoService.translate('SUCCESS.MSG0002'));
        }
      });
  }

  private buildCustomTableData(): CustomTableData {
    return {
      pageSize: 5,
      hasColumnAction: true,
      actions: [
        { label: 'LABELS.MSG0014', onClick: this.change.bind(this) },
        { label: 'LABELS.MSG0015', onClick: this.edit.bind(this) },
        { label: 'LABELS.MSG0016', onClick: this.delete.bind(this) },
      ],
      columns: [
        { label: 'LABELS.MSG0017', propertyKey: 'name', icon: 'people' },
        { label: 'LABELS.MSG0003', propertyKey: 'email' },
        { label: 'LABELS.MSG0018', propertyKey: 'phone', icon: 'phone' },
        { label: 'LABELS.MSG0019', propertyKey: 'website' },
      ],
    };
  }

  private getRandomUsers(): void {
    this.AdminService.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users: User[]) => {
        this.dataSource = new MatTableDataSource<User>(users);
      });
  }

  protected addItem(): void {
    this.matDialog
      .open(AdmDialogComponent, {
        autoFocus: false,
        data: {
          type: DialogUserType.CREATE,
        },
        ...(this.dialogScreenService.getWidth() <= BreakpointScreen.SM && this.dialogScreenService.appendProperties),
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user: User) => {
        if (user) {
          const newDataSource = [...this.dataSource.data, user];
          this.dataSource = new MatTableDataSource<User>(newDataSource);
        }
      });
  }
}
