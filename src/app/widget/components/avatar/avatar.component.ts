import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'sol-avatar',
  template: `
    <header class="avatar-drawer-header">
      <img class="avatar-drawer-header-img" alt="avatar" [src]="imageURL" [style.width.px]="size" [style.height.px]="size" />
      <span class="avatar-drawer-header-mail">{{ info }}</span>
    </header>
  `,
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AvatarComponent {
  @Input({ required: true }) info = '';
  @Input({ required: true }) imageURL = '';
  @Input() size = 120;
}
