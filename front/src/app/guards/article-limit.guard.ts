import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { ArticleService } from '../services/article.service';

export const articleLimitGuard: CanActivateFn = (route) => {
  const articleService = inject(ArticleService);

  return of(undefined).pipe(
    switchMap(async () => {
      if (articleService.articles() === undefined) {
        await articleService.load();
      }
      const articles = articleService.articles();
      if (articles === undefined) {
        return true;
      }
      if (articles.length < 5) {
        return true;
      }
      window.alert("Trop d'articles. Lisez les mentions légales... ");
      return createUrlTreeFromSnapshot(route, ['/legal']);
    })
  );
};
