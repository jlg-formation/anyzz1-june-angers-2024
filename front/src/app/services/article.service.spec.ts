import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { newArticle } from '../../test/data';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ArticleService);
    ctrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add', (done) => {
    service.add(newArticle).subscribe({
      error: () => {
        expect(true).toBe(false);
        done();
      },
      next: () => {
        expect(true).toBe(true);
        done();
      },
    });
    const req = ctrl.expectOne('/api/articles');
    req.flush('', { status: 201, statusText: 'Created' });
  });

  it('should add in error', (done) => {
    service.add(newArticle).subscribe({
      error: () => {
        expect(true).toBe(true);
        done();
      },
      next: () => {
        expect(true).toBe(false);
        done();
      },
    });
    const req = ctrl.expectOne('/api/articles');
    req.flush('', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should load', fakeAsync(() => {
    service.load().subscribe({
      next: () => {
        expect(true).toBe(true);
      },
    });
    const req = ctrl.expectOne('/api/articles');
    req.flush('', { status: 200, statusText: 'OK' });
    tick(1000);
  }));

  it('should load in error', (done) => {
    service.load().subscribe({
      next: () => {
        expect(service.errorMsg).toBe('Technical Error');
        done();
      },
    });
    const req = ctrl.expectOne('/api/articles');
    req.flush('', { status: 404, statusText: 'Not Found' });
  });

  it('should remove', fakeAsync(() => {
    service.remove(['asdf']).subscribe();
    tick(1000);
    const req = ctrl.expectOne('/api/articles');
    req.flush('', { status: 201, statusText: 'Created' });
    expect(true).toBe(true);
  }));

  it('should remove in error', fakeAsync(() => {
    service.remove(['asdf']).subscribe({
      error: (err) => {
        expect(err.message).toBe('Technical error');
      },
    });
    tick(1000);
    const req = ctrl.expectOne('/api/articles');
    req.flush('', { status: 500, statusText: 'Internal Error' });
    expect(true).toBe(true);
  }));
});
