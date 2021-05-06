import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrMentorSkillTemplateComponent } from './hr-mentor-skill-template.component';

describe('HrMentorSkillTemplateComponent', () => {
  let component: HrMentorSkillTemplateComponent;
  let fixture: ComponentFixture<HrMentorSkillTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrMentorSkillTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrMentorSkillTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
