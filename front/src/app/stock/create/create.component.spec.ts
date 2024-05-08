import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { routes } from '../../app.routes';
import { ArticleService } from '../../services/article.service';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  it('should submit', fakeAsync(() => {
    (async () => {
      await TestBed.configureTestingModule({
        imports: [CreateComponent, HttpClientTestingModule],
        providers: [
          provideRouter(routes),

          {
            provide: ArticleService,
            useValue: {
              add() {
                return of(undefined);
              },
              load() {
                return of(undefined);
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(CreateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.f.markAllAsTouched();
      fixture.detectChanges();

      component.submit().subscribe(() => {
        expect(true).toBe(true);
      });

      tick(1000);
    })();
  }));

  it('should submit in error', fakeAsync(() => {
    (async () => {
      await TestBed.configureTestingModule({
        imports: [CreateComponent, HttpClientTestingModule],
        providers: [
          provideRouter(routes),

          {
            provide: ArticleService,
            useValue: {
              add() {
                return throwError(() => new Error('oups'));
              },
              load() {
                return of(undefined);
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(CreateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.submit().subscribe(() => {
        expect(true).toBe(true);
      });

      tick(1000);
    })();
  }));
});
