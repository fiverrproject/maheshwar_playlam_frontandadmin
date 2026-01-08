import { TestBed } from '@angular/core/testing';

import { AdminCommon } from './admin-common';

describe('AdminCommon', () => {
  let service: AdminCommon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCommon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
