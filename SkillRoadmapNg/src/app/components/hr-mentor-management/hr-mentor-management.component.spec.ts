import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrMentorManagementComponent } from './hr-mentor-management.component';

describe('HrMentorManagementComponent', () => {
  let component: HrMentorManagementComponent;
  let fixture: ComponentFixture<HrMentorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrMentorManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrMentorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
