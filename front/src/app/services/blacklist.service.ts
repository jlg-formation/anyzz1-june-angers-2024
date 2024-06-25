import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';

const url = '/api/isInvalid';

@Injectable({
  providedIn: 'root',
})
export class BlacklistService {
  constructor(private readonly http: HttpClient) {}

  isInvalid(value: string): Observable<boolean> {
    return of(undefined).pipe(
      switchMap(() =>
        this.http.get<boolean>(url, {
          params: new HttpParams({ fromObject: { value } }),
        }),
      ),
      catchError((err) => {
        return of(false);
      }),
    );
  }
}
