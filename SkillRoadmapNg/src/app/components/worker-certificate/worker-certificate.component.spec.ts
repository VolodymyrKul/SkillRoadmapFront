import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCertificateComponent } from './worker-certificate.component';

describe('WorkerCertificateComponent', () => {
  let component: WorkerCertificateComponent;
  let fixture: ComponentFixture<WorkerCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
