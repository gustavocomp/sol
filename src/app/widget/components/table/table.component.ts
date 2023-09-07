import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { BreakpointTable } from 'src/app/shared/enums/breackpoint-table.enum';

import { ScreenSize } from 'src/app/shared/models/size/screen-size.model';
import { AuxiliaryColumns, CustomColumnData, CustomTableData } from 'src/app/shared/models/table/table.model';
import { CustomPaginatorIntl } from 'src/app/shared/services/custom-paginator-intl/custom-paginator-intl.service';
import { ResizeDirective } from '../../directives/resize.directive';

@Component({
  selector: 'sol-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    ResizeDirective,
    TranslocoModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class TableComponent<T> implements OnChanges {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('containerTable', { static: true }) containerTable: ElementRef<HTMLDivElement>;

  @Input({ required: true }) dataSource: MatTableDataSource<T>;
  @Input({ required: true }) customTableData: CustomTableData;

  @Output() clickRow = new EventEmitter<T>();

  readonly colorTextDefault = '#555555';
  readonly auxiliaryColumns: AuxiliaryColumns[] = ['actions', 'more'];
  readonly conditionsSlice = [
    { breakpoint: BreakpointTable.XS, slice: 1 },
    { breakpoint: BreakpointTable.SM, slice: 2 },
    { breakpoint: BreakpointTable.MD, slice: 3 },
    { breakpoint: BreakpointTable.LG, slice: 4 },
    { breakpoint: BreakpointTable.XL, slice: 4 },
  ];

  expandedRow: T | null;
  readOnlyDisplayedColumns: string[];
  displayedColumns: string[] = [];
  displayedColumnsHide: CustomColumnData[] = [];
  hasColumnAction = false;
  showColumnAction = false;
  showMoreDetails = false;
  pageSize = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.applyPropertiesChange(changes);
  }

  private applyPropertiesChange(changes: SimpleChanges): void {
    if (changes['dataSource'] && this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selfSize(this.getSizeContainer());
    }

    if (changes['customTableData'] && this.customTableData) {
      this.hasColumnAction = this.customTableData.hasColumnAction;
      this.readOnlyDisplayedColumns = this.customTableData.columns
        .map(column => column.propertyKey)
        .concat(this.hasColumnAction ? [this.auxiliaryColumns[0]] : []);

      this.displayedColumns = this.readOnlyDisplayedColumns;
      this.pageSize = this.customTableData.pageSize;
    }
  }

  private getSizeContainer(): ScreenSize {
    return {
      width: this.containerTable.nativeElement.offsetWidth,
      height: this.containerTable.nativeElement.offsetHeight,
    };
  }

  private managerColumnsHide(width: number): void {
    const columnsWithoutMore = this.displayedColumns.filter(item => item !== this.auxiliaryColumns[1]);
    const conditionRemoveColumns = this.conditionsSlice.find(item => width <= item.breakpoint);

    const differentCountColumns = columnsWithoutMore < this.readOnlyDisplayedColumns;

    const columnMore = conditionRemoveColumns || differentCountColumns ? [this.auxiliaryColumns[1]] : [];
    const columnSlice = this.readOnlyDisplayedColumns?.slice(0, conditionRemoveColumns?.slice)?.concat(columnMore);

    const columnAction = this.customTableData.hasColumnAction ? [this.auxiliaryColumns[0]] : [];
    const columnsHide = [
      ...new Set(
        conditionRemoveColumns ? this.readOnlyDisplayedColumns?.concat(columnAction)?.slice(conditionRemoveColumns.slice) : []
      ),
    ];

    const columnsShow = columnsHide.length == 0 ? columnSlice.filter(column => column !== this.auxiliaryColumns[1]) : columnSlice;
    this.displayedColumns = conditionRemoveColumns ? columnsShow : this.readOnlyDisplayedColumns;
    this.showColumnAction = columnsHide.includes(this.auxiliaryColumns[0]);

    this.buildColumnsHide(columnsHide);
  }

  private buildColumnsHide(columnsHide: string[]): void {
    this.displayedColumnsHide = this.customTableData.columns.filter(column => columnsHide.includes(column.propertyKey));

    if (this.displayedColumnsHide.length == 0) {
      this.expandedRow = null;
    }
  }

  selfSize({ width }: ScreenSize): void {
    if (!width) return;
    this.managerColumnsHide(width);
  }
}
