import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMemberComponent } from './training-member.component';

describe('TrainingMemberComponent', () => {
  let component: TrainingMemberComponent;
  let fixture: ComponentFixture<TrainingMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
