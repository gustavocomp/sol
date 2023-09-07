import { Injectable, inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly toastrService = inject(ToastrService);

  success = (message: string): void => this.buildMessage('success', message);

  error = (message: string): void => this.buildMessage('error', message);

  warning = (message: string): void => this.buildMessage('warning', message);

  info = (message: string): void => this.buildMessage('info', message);

  private buildMessage(type: NotificationType, message: string): void {
    this.toastrService[type](message, '', {
      extendedTimeOut: 1500,
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 1500,
    });
  }
}
