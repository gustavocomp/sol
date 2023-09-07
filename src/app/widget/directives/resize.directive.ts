import { Directive, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { ScreenSize } from 'src/app/shared/models/size/screen-size.model';

@Directive({
  selector: '[solResize]',
  standalone: true,
})
export class ResizeDirective {
  private readonly elementRef = inject(ElementRef);
  @Output() readonly selfSize = new EventEmitter<ScreenSize>();

  @HostListener('window:resize')
  onResize(): void {
    this.menagerResize();
  }

  private menagerResize(): void {
    this.selfSize.emit({ width: this.elementRef.nativeElement.offsetWidth, height: this.elementRef.nativeElement.offsetHeight });
  }
}
