import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSkillTemplateComponent } from './worker-skill-template.component';

describe('WorkerSkillTemplateComponent', () => {
  let component: WorkerSkillTemplateComponent;
  let fixture: ComponentFixture<WorkerSkillTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerSkillTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerSkillTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
