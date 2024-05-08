import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  CanActivateFn,
  Router,
  UrlTree,
  provideRouter,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { routes } from '../app.routes';
import { ArticleService } from '../services/article.service';
import { articleLimitGuard } from './article-limit.guard';
import { signal } from '@angular/core';

describe('articleLimitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => articleLimitGuard(...guardParameters));

  it('should says yes when less than 5 articles', (done) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        {
          provide: ArticleService,
          useValue: {
            articles: signal([]),
          },
        },
      ],
    });
    const router = TestBed.inject(Router);
    const route = TestBed.inject(ActivatedRoute);
    const obs = executeGuard(route.snapshot, router.routerState.snapshot);
    if (!(obs instanceof Observable)) {
      throw new Error('result must be an observable');
    }
    obs.subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('should say yes if articles is undefined', (done) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        {
          provide: ArticleService,
          useValue: {
            load() {
              return of(undefined);
            },
            articles: signal(undefined),
          },
        },
      ],
    });
    const router = TestBed.inject(Router);
    const route = TestBed.inject(ActivatedRoute);
    const obs = executeGuard(route.snapshot, router.routerState.snapshot);
    if (!(obs instanceof Observable)) {
      throw new Error('result must be an observable');
    }
    obs.subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('should redirect to /legal when more than 5 articles', (done) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        {
          provide: ArticleService,
          useValue: {
            articles: signal([1, 2, 3, 4, 5, 6]),
          },
        },
      ],
    });
    const router = TestBed.inject(Router);
    const route = TestBed.inject(ActivatedRoute);
    const obs = executeGuard(route.snapshot, router.routerState.snapshot);
    if (!(obs instanceof Observable)) {
      throw new Error('result must be an observable');
    }
    obs.subscribe((result) => {
      if (!(result instanceof UrlTree)) {
        throw new Error('should be UrlTree');
      }
      expect(result.toString()).toEqual('/legal');
      done();
    });
  });
});
