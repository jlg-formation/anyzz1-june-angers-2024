import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { newArticle } from '../../tests/data';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(ArticleService);
    ctrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    ctrl.verify();
  });

  it('should add an article', (done) => {
    service.add(newArticle).subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });

    const req = ctrl.expectOne('/api/articles');
    expect(req.request.method).toEqual('POST');
    req.flush('');
  });

  it('should add an article in error', (done) => {
    service.add(newArticle).subscribe({
      error: (e) => {
        expect(e).toBeTruthy();
        done();
      },
    });
    const req = ctrl.expectOne('/api/articles');
    expect(req.request.method).toEqual('POST');
    req.flush('', { status: 400, statusText: 'Bad Request' });
  });

  it('should load articles', (done) => {
    service.load().subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });

    const req = ctrl.expectOne('/api/articles');
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  });

  it('should load articles in error', (done) => {
    service.load().subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });

    const req = ctrl.expectOne('/api/articles');
    expect(req.request.method).toEqual('GET');
    req.flush('', { status: 500, statusText: 'Internal Error' });
  });

  it('should remove articles', (done) => {
    service.remove([]).subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });

    const req = ctrl.expectOne('/api/articles');
    expect(req.request.method).toEqual('DELETE');
    req.flush('');
  });

  it('should remove articles in error', (done) => {
    service.remove([]).subscribe({
      error: (e) => {
        expect(e).toBeTruthy();
        done();
      },
    });
    const req = ctrl.expectOne('/api/articles');
    expect(req.request.method).toEqual('DELETE');
    req.flush('', { status: 400, statusText: 'Bad Request' });
  });

  it('should not remove 2 articles', (done) => {
    // mocking window.alert
    window.alert = () => {};
    service.remove(['a1', 'a2']).subscribe({
      next: () => {
        expect(true).toBeTruthy();
        done();
      },
    });
  });
});
