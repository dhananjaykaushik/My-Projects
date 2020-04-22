import { BugCountPipe } from './bug-count.pipe';

describe('BugCountPipe', () => {
  it('create an instance', () => {
    const pipe = new BugCountPipe();
    expect(pipe).toBeTruthy();
  });
});
