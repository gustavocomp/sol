import { TestBed } from '@angular/core/testing';

import { DialogScreenService } from './dialog-screen.service';

describe(`${DialogScreenService.name}`, () => {
  let service: DialogScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogScreenService);
  });

  it(`#${DialogScreenService.name} - should return the width of the screen in pixels when invoked`, () => {
    const width = service.getHeight();
    const isNumber = typeof width == 'number';
    expect(isNumber).toBeTruthy();
  });

  it(`#${DialogScreenService.name} - should return the height of the screen in pixels when invoked`, () => {
    const width = service.getWidth();
    const isNumber = typeof width == 'number';
    expect(isNumber).toBeTruthy();
  });

  it(`#${DialogScreenService.name} - should return the properties that the matDialog uses when passed as a parameter in matDialog.ope()`, () => {
    const expectObject = {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
    };

    expect(expectObject).toEqual(service.appendProperties);
  });
});
