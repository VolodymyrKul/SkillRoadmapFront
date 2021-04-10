import { TestBed } from '@angular/core/testing';

import { TrainingMemberService } from './training-member.service';

describe('TrainingMemberService', () => {
  let service: TrainingMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
