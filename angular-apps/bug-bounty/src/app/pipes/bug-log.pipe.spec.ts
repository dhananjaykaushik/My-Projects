import { BugLogPipe } from './bug-log.pipe';

describe('BugLogPipe', () => {
  it('create an instance', () => {
    const pipe = new BugLogPipe();
    expect(pipe).toBeTruthy();
  });
});
