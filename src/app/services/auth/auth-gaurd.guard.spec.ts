import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGaurdGuard } from './auth-gaurd.guard';

describe('authGaurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGaurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
