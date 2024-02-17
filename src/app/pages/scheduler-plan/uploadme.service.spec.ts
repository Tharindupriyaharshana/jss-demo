import { TestBed } from '@angular/core/testing';

import { UploadmeService } from './uploadme.service';

describe('UploadmeService', () => {
  let service: UploadmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
