import { defaultHandler } from '../default';

describe('defaultHandler', () => {
  let saga;
  beforeEach(() => {
    saga = defaultHandler();
  });
  it('runs without error', () => {
    expect(saga.next().value).toEqual({ text: 'something' });
  });
});
