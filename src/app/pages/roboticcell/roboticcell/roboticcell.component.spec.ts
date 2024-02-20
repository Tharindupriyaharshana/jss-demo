import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoboticcellComponent } from './roboticcell.component';

describe('RoboticcellComponent', () => {
  let component: RoboticcellComponent;
  let fixture: ComponentFixture<RoboticcellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoboticcellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoboticcellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
