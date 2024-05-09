import { TestBed } from '@angular/core/testing';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import { of, tap } from 'rxjs';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should be authorizing', (done) => {
    let expectedReq: HttpRequest<unknown> | undefined = undefined;
    const next: HttpHandlerFn = (req: HttpRequest<unknown>) => {
      return of(new HttpResponse()).pipe(
        tap(() => {
          expectedReq = req;
        })
      );
    };
    const req = new HttpRequest('GET', '/truc');
    const result = interceptor(req, next);
    result.subscribe(() => {
      expect(expectedReq?.headers.get('Authorization')).toEqual(
        'Bearer this is my auth token'
      );
      done();
    });
  });
});
