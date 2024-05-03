import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { articleLimitGuard } from './article-limit.guard';

describe('articleLimitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => articleLimitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
