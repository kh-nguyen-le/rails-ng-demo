import { TestBed } from '@angular/core/testing';

import { CableService } from './cable.service';

describe('CableService', () => {
  let service: CableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
