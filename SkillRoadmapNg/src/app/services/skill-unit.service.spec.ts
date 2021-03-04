import { TestBed } from '@angular/core/testing';

import { SkillUnitService } from './skill-unit.service';

describe('SkillUnitService', () => {
  let service: SkillUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
