import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, delay, map, of, switchMap } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';
import { API_SERVER_URL } from '../tokens/api-server-url.token';

const path = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles = signal<Article[] | undefined>(undefined);
  errorMsg = '';
  url = this.apiServerUrl + path;

  constructor(
    private http: HttpClient,
    @Inject(API_SERVER_URL) private apiServerUrl: string
  ) {}

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.post<void>(this.url, newArticle)),
      catchError(() => {
        throw new Error('Erreur Technique');
      })
    );
  }

  load(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';
        return this.http.get<Article[]>(this.url);
      }),
      delay(1000),
      map((articles) => {
        this.articles.set(articles);
      }),
      catchError(() => {
        this.errorMsg = 'Erreur Technique';
        return of(undefined);
      })
    );
  }

  remove(ids: string[]): Observable<void> {
    return of(undefined).pipe(
      delay(1000),
      switchMap(() => {
        if (ids.length === 2) {
          window.alert(
            'Règle de business bizarre: tu peux pas effacer deux articles à la fois.'
          );
          return of(undefined);
        }
        return this.http.delete<void>(this.url, {
          body: ids,
        });
      }),
      catchError(() => {
        throw new Error('Technical error');
      })
    );
  }
}
