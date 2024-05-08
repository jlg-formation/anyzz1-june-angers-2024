import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  inject,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AsyncBtnComponent } from '@gestionstock/widgets';
import {
  Observable,
  Subject,
  catchError,
  delay,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { NewArticle } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { API_SERVER_URL } from '../../tokens/api-server-url.token';
import { FormGroupArgs, getErrors } from '../../utils/errors.utils';
import { blackListValidator } from '../../validators/black-list.validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, AsyncBtnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements DoCheck {
  doCheck = new Subject<void>();
  errorMsg = '';
  f = this.fb.group<FormGroupArgs<NewArticle>>({
    name: [
      'Truc',
      [Validators.required],
      [
        blackListValidator(
          inject(HttpClient),
          this.cdref,
          inject(API_SERVER_URL)
        ),
      ],
    ],
    price: [0, [Validators.required]],
    qty: [1, [Validators.required]],
  });
  fErrors = getErrors(this.f, this.doCheck);
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {}

  ngDoCheck(): void {
    this.doCheck.next();
  }

  setError(errorMsg: string) {
    this.errorMsg = errorMsg;
  }

  submit(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.isAdding = true;
      }),
      delay(1000),
      switchMap(() => {
        const newArticle: NewArticle = this.f.getRawValue();
        return this.articleService.add(newArticle);
      }),
      switchMap(() => this.articleService.load()),
      switchMap(() => this.router.navigate(['..'], { relativeTo: this.route })),
      catchError((err) => {
        if (err instanceof Error) {
          this.errorMsg = err.message;
        }
        return of(undefined);
      }),
      finalize(() => {
        this.isAdding = false;
        this.cdref.markForCheck();
      }),
      map(() => {})
    );
  }
}
