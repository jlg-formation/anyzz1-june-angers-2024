import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Observable,
  Subject,
  catchError,
  delay,
  finalize,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { getErrors } from '../../../utils/error';
import { Formify } from '../../../utils/formify';
import { NewArticle } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { BlacklistService } from '../../services/blacklist.service';
import { blackListValidator } from '../../widgets/validators/blackList.validator';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, JsonPipe],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export default class CreateComponent implements DoCheck {
  doCheck = new Subject<void>();
  errorMsg = '';
  f = this.fb.nonNullable.group<Formify<NewArticle>>({
    name: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.maxLength(10)],
      asyncValidators: [blackListValidator(this.blackListService, this.cdref)],
    }),
    price: this.fb.nonNullable.control(0, [Validators.required]),
    qty: this.fb.nonNullable.control(1, [Validators.required]),
  });
  fErrors = getErrors(this.f, this.doCheck);
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private blackListService: BlacklistService,
    private cdref: ChangeDetectorRef,
  ) {}

  ngDoCheck(): void {
    this.doCheck.next();
  }

  submit(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.isAdding = true;
      }),
      delay(1000),
      switchMap(() => this.articleService.add(this.f.getRawValue())),
      switchMap(() => this.articleService.load()),
      switchMap(async () => {
        await this.router.navigate(['..'], { relativeTo: this.route });
      }),
      catchError((err) => {
        console.log('err: ', err);
        if (err instanceof Error) {
          this.errorMsg = err.message;
        }
        return of(undefined);
      }),
      finalize(() => {
        this.isAdding = false;
      }),
    );
  }
}
