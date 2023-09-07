import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogTemplateConfig } from './dialog-template.model';

@Component({
  selector: 'sol-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, TranslocoModule],
})
export class DialogTemplateComponent {
  @Input({ required: true }) dialogTemplateConfig: DialogTemplateConfig;
}
