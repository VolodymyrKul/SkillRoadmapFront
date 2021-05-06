import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSkillMatrixComponent } from './worker-skill-matrix.component';

describe('WorkerSkillMatrixComponent', () => {
  let component: WorkerSkillMatrixComponent;
  let fixture: ComponentFixture<WorkerSkillMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerSkillMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerSkillMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
