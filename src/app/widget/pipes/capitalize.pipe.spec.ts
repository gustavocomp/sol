import { CapitalizePipe } from './capitalize.pipe';

describe(`${CapitalizePipe.name}`, () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it(`${CapitalizePipe.name} - should create a Pipe instance when invoked`, () => {
    expect(pipe).toBeTruthy();
  });

  it(`${CapitalizePipe.name} - should transform text when invoked whith parameter`, () => {
    const text = 'sol aplicações';
    const result = pipe.transform(text);
    const textExpected = 'Sol aplicações';

    expect(result).toBe(textExpected);
  });

  it(`${CapitalizePipe.name} - should change all letters of the text to uppercase when invoked by passing the true parameter`, () => {
    const text = 'sol aplicações';
    const result = pipe.transform(text, true);
    const textExpected = 'SOL APLICAÇÕES';

    expect(result).toBe(textExpected);
  });
});
