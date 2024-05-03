import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { catchError, delay, finalize, of, switchMap, tap } from 'rxjs';
import { NewArticle } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { getErrors } from '../../utils/errors.utils';
import { blackListValidator } from '../../validators/black-list.validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, AsyncPipe],
})
export class CreateComponent {
  errorMsg = '';
  f = this.fb.group({
    name: [
      'Truc',
      [Validators.required],
      [blackListValidator(inject(HttpClient), this.cdref)],
    ],
    price: [0, [Validators.required]],
    qty: [1, [Validators.required]],
  });
  errors = getErrors(this.f);
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

  submit() {
    return of(undefined)
      .pipe(
        tap(() => {
          this.isAdding = true;
        }),
        delay(1000),
        switchMap(() => {
          const newArticle: NewArticle = this.f.getRawValue();
          return this.articleService.add(newArticle);
        }),
        switchMap(() => this.articleService.load()),
        switchMap(() =>
          this.router.navigate(['..'], { relativeTo: this.route })
        ),
        catchError((err) => {
          console.log('err: ', err);
          if (err instanceof Error) {
            this.errorMsg = err.message;
          }
          return of(undefined);
        }),
        finalize(() => {
          this.isAdding = false;
          this.cdref.markForCheck();
        })
      )
      .subscribe();
  }
}
