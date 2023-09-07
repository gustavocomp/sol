import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  private readonly translocoService = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);

  changes = new Subject<void>();
  itemsPerPageLabel: string;
  firstPageLabel: string;
  lastPageLabel: string;
  nextPageLabel: string;
  previousPageLabel: string;

  constructor() {
    this.setTextPaginatorIntl();

    this.translocoService.langChanges$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.setTextPaginatorIntl();
      this.changes.next();
    });
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translocoService.translate('TABLE.MSG0006', { page: 1, pages: 1 });
    }
    const amountPages = Math.ceil(length / pageSize);
    return this.translocoService.translate('TABLE.MSG0006', { page: page + 1, pages: amountPages });
  }

  private setTextPaginatorIntl(): void {
    this.itemsPerPageLabel = this.translocoService.translate('TABLE.MSG0001');
    this.firstPageLabel = this.translocoService.translate('TABLE.MSG0002');
    this.lastPageLabel = this.translocoService.translate('TABLE.MSG0003');
    this.nextPageLabel = this.translocoService.translate('TABLE.MSG0004');
    this.previousPageLabel = this.translocoService.translate('TABLE.MSG0005');
  }
}
