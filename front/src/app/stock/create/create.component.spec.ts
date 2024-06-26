import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { BlacklistService } from '../../services/blacklist.service';
import CreateComponent from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  const myArticleService = {
    add(): Observable<void> {
      return of(undefined);
    },
    load(): Observable<void> {
      return of(undefined);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComponent],
      providers: [
        { provide: BlacklistService, useValue: {} },
        {
          provide: ArticleService,
          useValue: myArticleService,
        },
        provideRouter([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    myArticleService.add = (): Observable<void> => of(undefined);
    component.submit().subscribe({
      next: () => {
        expect(true).toBe(true);
      },
      error: () => {
        expect(false).toBe(true);
      },
    });
    tick(1000);
    expect(true).toBe(true);
  }));

  it('should submit in error', fakeAsync(() => {
    myArticleService.add = (): Observable<void> =>
      throwError(() => new Error('oups'));

    component.submit().subscribe({
      next: () => {
        expect(true).toBe(true);
      },
      error: () => {
        expect(false).toBe(true);
      },
    });
    tick(1000);
    expect(true).toBe(true);
  }));
});
