import { Injectable, Signal, signal } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { delay, lastValueFrom, catchError, switchMap, timer } from 'rxjs';

const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles = signal<Article[] | undefined>(undefined);
  errorMsg = '';

  constructor(private http: HttpClient) {}

  async add(newArticle: NewArticle) {
    await lastValueFrom(
      this.http.post<void>(url, newArticle).pipe(
        catchError((err) => {
          console.log('err: ', err);
          throw new Error('Technical error');
        })
      )
    );
  }

  async load() {
    try {
      this.errorMsg = '';
      await this.http
        .get<Article[]>(url)
        .pipe(delay(1000))
        .forEach((articles) => {
          console.log('setting articles: ', articles);
          this.articles.set(articles);
        });
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Technical Error';
    }
  }

  async remove(ids: string[]) {
    await lastValueFrom(
      timer(1000).pipe(
        switchMap(() =>
          this.http.delete<void>(url, {
            body: ids,
          })
        ),
        catchError((err) => {
          console.log('err: ', err);
          throw new Error('Technical error');
        })
      )
    );
  }
}
