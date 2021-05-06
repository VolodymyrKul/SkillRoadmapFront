import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerTrainingComponent } from './worker-training.component';

describe('WorkerTrainingComponent', () => {
  let component: WorkerTrainingComponent;
  let fixture: ComponentFixture<WorkerTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
