import { TestBed } from '@angular/core/testing';

import { RoboticcellService } from './roboticcell.service';

describe('RoboticcellService', () => {
  let service: RoboticcellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoboticcellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
