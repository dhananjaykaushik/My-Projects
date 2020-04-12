import { TestBed, async, inject } from '@angular/core/testing';

import { PartOfTeamGuard } from './part-of-team.guard';

describe('PartOfTeamGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartOfTeamGuard]
    });
  });

  it('should ...', inject([PartOfTeamGuard], (guard: PartOfTeamGuard) => {
    expect(guard).toBeTruthy();
  }));
});
