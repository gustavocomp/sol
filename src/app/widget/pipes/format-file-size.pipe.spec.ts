import { FormatFileSizePipe } from './format-file-size.pipe';

describe(`${FormatFileSizePipe.name}`, () => {
  let pipe: FormatFileSizePipe;

  beforeEach(() => {
    pipe = new FormatFileSizePipe();
  });

  it(`${FormatFileSizePipe.name} - should create a Pipe instance when invoked`, () => {
    expect(pipe).toBeTruthy();
  });

  it(`${FormatFileSizePipe.name} - should transform number in long format file size`, () => {
    const sizeInBytes = 1024;
    const result = pipe.transform(sizeInBytes, true);
    const textExpected = '1 Kilobytes';

    expect(result).toBe(textExpected);
  });

  it(`${FormatFileSizePipe.name} - should transform number in short format file size`, () => {
    const sizeInBytes = 1024;
    const result = pipe.transform(sizeInBytes);
    const textExpected = '1 KB';

    expect(result).toBe(textExpected);
  });
});
