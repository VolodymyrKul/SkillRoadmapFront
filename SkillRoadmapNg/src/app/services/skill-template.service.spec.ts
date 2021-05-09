import { TestBed } from '@angular/core/testing';

import { SkillTemplateService } from './skill-template.service';

describe('SkillTemplateService', () => {
  let service: SkillTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
