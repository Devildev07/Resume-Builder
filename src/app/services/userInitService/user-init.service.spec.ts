import { TestBed } from '@angular/core/testing';

import { UserInitService } from './user-init.service';

describe('UserInitService', () => {
  let service: UserInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
