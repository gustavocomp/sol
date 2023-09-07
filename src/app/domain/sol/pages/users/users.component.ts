import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { BreakpointScreen, DialogScreenService } from '@shared/services/screen/dialog-screen.service';
import { User } from 'src/app/shared/models/admin/admin.model';
import { CustomTableData } from 'src/app/shared/models/table/table.model';
import { TableComponent } from 'src/app/widget/components/table/table.component';
import { TitlePageDefaultComponent } from 'src/app/widget/components/title-page-default/title-page-default.component';
import { AdminService } from '../admin/admin.service';
import { ShowUserDialogComponent } from './../../../../shared/dialogs/show-user-dialog/show-user-dialog.component';

@Component({
  selector: 'sol-users',
  template: `
    <main class="container-user">
      <sol-title-page-default [title]="'LABELS.MSG0020' | transloco" />
      <section class="user-content">
        <sol-table (clickRow)="clickRow($event)" [dataSource]="dataSource" [customTableData]="customTableData" />
      </section>
    </main>
  `,
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, TableComponent, TitlePageDefaultComponent, TranslocoModule],
})
export class UsersComponent implements OnInit {
  private readonly AdminService = inject(AdminService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly matDialog = inject(MatDialog);
  private readonly dialogScreenService = inject(DialogScreenService);

  dataSource: MatTableDataSource<User>;
  readonly customTableData: CustomTableData = this.buildCustomTableData();

  ngOnInit(): void {
    this.getRandomUsers();
  }

  private getRandomUsers(): void {
    this.AdminService.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users: User[]) => {
        this.dataSource = new MatTableDataSource<User>(users);
      });
  }

  private buildCustomTableData(): CustomTableData {
    return {
      pageSize: 10,
      hasColumnAction: false,
      columns: [
        { label: 'LABELS.MSG0017', propertyKey: 'name', colorText: '#20a6d9' },
        { label: 'LABELS.MSG0003', propertyKey: 'email' },
        { label: 'LABELS.MSG0018', propertyKey: 'phone' },
        { label: 'LABELS.MSG0019', propertyKey: 'website' },
        { label: 'LABELS.MSG0021', propertyKey: 'id' },
      ],
    };
  }

  clickRow(user: User): void {
    this.matDialog.open(ShowUserDialogComponent, {
      autoFocus: false,
      data: user,
      ...(this.dialogScreenService.getWidth() <= BreakpointScreen.SM && this.dialogScreenService.appendProperties),
    });
  }
}
