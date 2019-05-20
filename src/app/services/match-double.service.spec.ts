import { TestBed } from '@angular/core/testing';

import { MatchDoubleService } from './match-double.service';

describe('MatchDoubleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchDoubleService = TestBed.get(MatchDoubleService);
    expect(service).toBeTruthy();
  });
});
