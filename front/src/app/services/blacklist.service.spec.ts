import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BlacklistService } from './blacklist.service';

describe('BlacklistService', () => {
  let service: BlacklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BlacklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
