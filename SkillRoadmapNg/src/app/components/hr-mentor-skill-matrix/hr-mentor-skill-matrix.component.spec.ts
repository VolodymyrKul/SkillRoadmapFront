import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrMentorSkillMatrixComponent } from './hr-mentor-skill-matrix.component';

describe('HrMentorSkillMatrixComponent', () => {
  let component: HrMentorSkillMatrixComponent;
  let fixture: ComponentFixture<HrMentorSkillMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrMentorSkillMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrMentorSkillMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
