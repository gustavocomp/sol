import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TitlePageDefaultComponent } from 'src/app/widget/components/title-page-default/title-page-default.component';
@Component({
  selector: 'sol-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoModule, TitlePageDefaultComponent],
})
export class DashboardComponent {}
