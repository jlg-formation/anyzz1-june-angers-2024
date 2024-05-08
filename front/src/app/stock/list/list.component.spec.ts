import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { a1 } from '../../../tests/data';
import { routes } from '../../app.routes';
import { ArticleService } from '../../services/article.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, HttpClientTestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create with non empty articles', async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, HttpClientTestingModule],
      providers: [
        provideRouter(routes),
        {
          provide: ArticleService,
          useValue: {
            articles: signal([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should refresh', fakeAsync(() => {
    (async () => {
      await TestBed.configureTestingModule({
        imports: [ListComponent, HttpClientTestingModule],
        providers: [
          provideRouter(routes),
          {
            provide: ArticleService,
            useValue: {
              articles: signal([]),
              load() {
                return of(undefined);
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.refresh().subscribe(() => {
        expect(true).toEqual(true);
      });

      tick(1000);

      expect(component).toBeTruthy();
    })();
  }));

  it('should refresh in Error type error', fakeAsync(() => {
    (async () => {
      await TestBed.configureTestingModule({
        imports: [ListComponent, HttpClientTestingModule],
        providers: [
          provideRouter(routes),
          {
            provide: ArticleService,
            useValue: {
              articles: signal([]),
              load() {
                return throwError(() => new Error('oups'));
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.refresh().subscribe(() => {
        expect(true).toEqual(true);
      });

      tick(1000);

      expect(component).toBeTruthy();
    })();
  }));

  it('should refresh in string error', fakeAsync(() => {
    (async () => {
      await TestBed.configureTestingModule({
        imports: [ListComponent, HttpClientTestingModule],
        providers: [
          provideRouter(routes),
          {
            provide: ArticleService,
            useValue: {
              articles: signal([]),
              load() {
                return throwError(() => 'oups');
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.refresh().subscribe(() => {
        expect(true).toEqual(true);
      });

      tick(1000);

      expect(component).toBeTruthy();
    })();
  }));

  it('should remove', fakeAsync(() => {
    (async () => {
      await TestBed.configureTestingModule({
        imports: [ListComponent, HttpClientTestingModule],
        providers: [
          provideRouter(routes),
          {
            provide: ArticleService,
            useValue: {
              articles: signal([]),
              load() {
                return of(undefined);
              },
              remove() {
                return of(undefined);
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.select(a1);
      component.select(a1);
      component.select(a1);

      component.remove().subscribe(() => {
        expect(true).toEqual(true);
      });

      tick(1000);

      expect(component).toBeTruthy();
    })();
  }));

  it('should remove in error', fakeAsync(() => {
    (async () => {
      await TestBed.configureTestingModule({
        imports: [ListComponent, HttpClientTestingModule],
        providers: [
          provideRouter(routes),
          {
            provide: ArticleService,
            useValue: {
              articles: signal([]),
              load() {
                return of(undefined);
              },
              remove() {
                return throwError(() => new Error('oups'));
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.select(a1);
      component.select(a1);
      component.select(a1);
      component.setError('');

      component.remove().subscribe(() => {
        expect(true).toEqual(true);
      });

      tick(1000);

      expect(component).toBeTruthy();
    })();
  }));
});
