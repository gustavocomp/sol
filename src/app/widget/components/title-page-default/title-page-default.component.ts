import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'sol-title-page-default',
  template: `
    <header class="container-title-page-default">
      <h1 class="title-page-default">{{ title }}</h1>
    </header>
  `,
  styleUrls: ['./title-page-default.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TitlePageDefaultComponent {
  @Input({ required: true }) title = '';
}
