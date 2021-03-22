import { TestBed } from '@angular/core/testing';

import { SkillMetricService } from './skill-metric.service';

describe('SkillMetricService', () => {
  let service: SkillMetricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillMetricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
