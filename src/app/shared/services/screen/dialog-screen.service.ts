import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogScreenService {
  appendProperties = {
    maxWidth: '100vw',
    maxHeight: '100vh',
    height: '100%',
    width: '100%',
    panelClass: 'full-screen-modal',
  };

  getWidth(): number {
    return window.screen.width;
  }

  getHeight(): number {
    return window.screen.height;
  }
}

export enum BreakpointScreen {
  XS = 599,
  SM = 959,
  MD = 1279,
  LG = 1919,
}
