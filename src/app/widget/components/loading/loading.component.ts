import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingHttpInterceptorService } from 'src/app/shared/interceptors/loading-http-interceptor/loading-http-interceptor.service';

@Component({
  selector: 'sol-loading',
  template: `
    <div class="overlay" *ngIf="loading$ | async">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class LoadingComponent {
  loading$ = inject(LoadingHttpInterceptorService).loading$;
}
