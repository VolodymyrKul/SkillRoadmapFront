import { TestBed } from '@angular/core/testing';

import { SignInAlertService } from './sign-in-alert.service';

describe('SignInAlertService', () => {
  let service: SignInAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
