import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Observable,
  catchError,
  delay,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { getErrorMessage } from '../../../utils/error';
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
export default class CreateComponent implements OnInit {
  errorMsg = '';
  f = this.fb.nonNullable.group<Formify<NewArticle>>({
    name: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(10),
      blackListValidator(this.blackListService, { matchCase: false }),
    ]),
    price: this.fb.nonNullable.control(0, [Validators.required]),
    qty: this.fb.nonNullable.control(1, [Validators.required]),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  getErrorMessage = getErrorMessage;
  isAdding = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private blackListService: BlacklistService,
  ) {}

  ngOnInit(): void {}

  submit(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.isAdding = true;
      }),
      delay(1000),
      switchMap(() => this.articleService.add(this.f.getRawValue())),
      switchMap(() => this.articleService.load()),
      switchMap(() => this.router.navigate(['..'], { relativeTo: this.route })),
      map(() => {}),
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
