import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrMentorTrainingComponent } from './hr-mentor-training.component';

describe('HrMentorTrainingComponent', () => {
  let component: HrMentorTrainingComponent;
  let fixture: ComponentFixture<HrMentorTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrMentorTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrMentorTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
