import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrMentorCertificateComponent } from './hr-mentor-certificate.component';

describe('HrMentorCertificateComponent', () => {
  let component: HrMentorCertificateComponent;
  let fixture: ComponentFixture<HrMentorCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrMentorCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrMentorCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
