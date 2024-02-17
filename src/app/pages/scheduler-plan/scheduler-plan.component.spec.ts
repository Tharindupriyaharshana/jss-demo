import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerPlanComponent } from './scheduler-plan.component';

describe('SchedulerPlanComponent', () => {
  let component: SchedulerPlanComponent;
  let fixture: ComponentFixture<SchedulerPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
