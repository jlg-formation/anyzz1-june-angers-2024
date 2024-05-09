import {
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { filterInterceptor } from './filter.interceptor';

fdescribe('filterInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => filterInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should be filter one article', (done) => {
    const next: HttpHandlerFn = () => {
      return of(
        new HttpResponse({ body: [{ name: 'hidden' }, { name: 'regular' }] })
      );
    };
    const req = new HttpRequest('GET', '/truc');
    const obs = interceptor(req, next);
    obs.subscribe((httpEvent) => {
      const response = httpEvent as HttpResponse<unknown>;
      expect(response.body).toEqual([{ name: 'regular' }]);
      done();
    });
  });

  it('should be do nothing when not an array', (done) => {
    const next: HttpHandlerFn = () => {
      return of(new HttpResponse({ body: 'not an array' }));
    };
    const req = new HttpRequest('GET', '/truc');
    const obs = interceptor(req, next);
    obs.subscribe((httpEvent) => {
      const response = httpEvent as HttpResponse<unknown>;
      expect(response.body).toEqual('not an array');
      done();
    });
  });

  it('should be do nothing when not an http response', (done) => {
    const next: HttpHandlerFn = () => {
      return of({
        type: HttpEventType.Sent,
      });
    };
    const req = new HttpRequest('GET', '/truc');
    const obs = interceptor(req, next);
    obs.subscribe((httpEvent) => {
      expect(httpEvent).toEqual({
        type: HttpEventType.Sent,
      });
      done();
    });
  });
});
