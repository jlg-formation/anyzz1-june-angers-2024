import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { BlacklistService, url } from './blacklist.service';

describe('BlacklistService', () => {
  let service: BlacklistService;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BlacklistService);
    ctrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should invalid', fakeAsync(() => {
    service.isInvalid('zut').subscribe({
      next: (isInvalid) => {
        console.log('isInvalid: ', isInvalid);
        expect(isInvalid).toBe(true);
      },
      error: () => {
        expect(false).toBe(true);
      },
    });
    tick(300);
    const req = ctrl.expectOne(url + '?value=zut');
    req.flush(true, { status: 200, statusText: 'OK' });
    expect(true).toBe(true);
  }));

  it('should invalid in error', fakeAsync(() => {
    service.isInvalid('zut').subscribe({
      next: (isInvalid) => {
        console.log('isInvalid: ', isInvalid);
        expect(isInvalid).toBe(false);
      },
      error: () => {
        expect(false).toBe(true);
      },
    });
    tick(300);
    const req = ctrl.expectOne(url + '?value=zut');
    req.flush(true, { status: 500, statusText: 'Internal Error' });
    expect(true).toBe(true);
  }));
});
