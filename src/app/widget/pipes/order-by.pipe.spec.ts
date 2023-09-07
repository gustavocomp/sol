import { OrderByPipe } from './order-by.pipe';

describe(`${OrderByPipe.name}`, () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it(`${OrderByPipe.name} - should create a Pipe instance when invoked`, () => {
    expect(pipe).toBeTruthy();
  });

  it(`${OrderByPipe.name} - should sort a complex list when it receives the base property as a parameter for sorting`, () => {
    const list = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    const sortedList = pipe.transform(list, 'name');
    const match = sortedList?.every((item, index) => {
      return item.name === list[index].name;
    });
    expect(match).toBeTruthy();
  });
});
