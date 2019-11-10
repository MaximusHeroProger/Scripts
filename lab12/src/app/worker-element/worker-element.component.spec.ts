import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerElementComponent } from './worker-element.component';

describe('WorkerElementComponent', () => {
  let component: WorkerElementComponent;
  let fixture: ComponentFixture<WorkerElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
