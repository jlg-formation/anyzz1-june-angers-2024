import { ChangeDetectorRef, Component, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
})
export class ListComponent implements OnInit {
  errorMsg = '';
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  isRefreshing = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();

  constructor(
    public articleService: ArticleService,
    private cdref: ChangeDetectorRef
  ) {
    console.log('instantiate list component');
  }

  getTotalArticles = computed(() => {
    console.log('getTotalArticles');
    const articles = this.articleService.articles();
    if (articles === undefined) {
      return 0;
    }
    return articles.length;
  });

  ngOnInit(): void {
    if (this.articleService.articles() === undefined) {
      this.articleService.load().subscribe();
    }
  }

  refresh() {
    of(undefined)
      .pipe(
        switchMap(() => {
          this.errorMsg = '';
          this.isRefreshing = true;
          return this.articleService.load();
        }),
        catchError((err) => {
          console.log('err: ', err);
          if (err instanceof Error) {
            this.errorMsg = err.message;
          } else {
            this.errorMsg = 'Erreur Technique';
          }
          return of(undefined);
        }),
        finalize(() => {
          this.isRefreshing = false;
          this.cdref.markForCheck();
        })
      )
      .subscribe();
  }

  remove() {
    return of(undefined)
      .pipe(
        switchMap(() => {
          this.errorMsg = '';
          this.isRemoving = true;
          const ids = [...this.selectedArticles].map((a) => a.id);
          return this.articleService.remove(ids);
        }),
        switchMap(() => this.articleService.load()),
        tap(() => {
          this.selectedArticles.clear();
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = 'Cannot suppress';
          return of(undefined);
        }),
        finalize(() => {
          this.isRemoving = false;
          this.cdref.markForCheck();
        })
      )
      .subscribe();
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
