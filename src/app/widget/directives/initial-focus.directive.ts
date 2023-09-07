import { AfterContentInit, Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[solInitialFocus]',
  standalone: true,
})
export class InitialFocusDirective implements AfterContentInit, OnChanges {
  @Input() public autoFocus = true;

  constructor(private element: ElementRef) {}

  ngAfterContentInit(): void {
    this.setFocus();
  }

  ngOnChanges(): void {
    this.setFocus();
  }

  private setFocus(): void {
    setTimeout(() => {
      if (this.autoFocus) this.element?.nativeElement?.focus();
    }, 500);
  }
}
