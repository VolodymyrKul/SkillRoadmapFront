import { TestBed } from '@angular/core/testing';

import { ComparationService } from './comparation.service';

describe('ComparationService', () => {
  let service: ComparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
