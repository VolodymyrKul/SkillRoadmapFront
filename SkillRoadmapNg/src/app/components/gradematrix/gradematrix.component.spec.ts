import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradematrixComponent } from './gradematrix.component';

describe('GradematrixComponent', () => {
  let component: GradematrixComponent;
  let fixture: ComponentFixture<GradematrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradematrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradematrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
