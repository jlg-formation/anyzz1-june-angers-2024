import { HttpClient, HttpParams } from '@angular/common/http';
import { AsyncValidatorFn } from '@angular/forms';
import { catchError, map, of, switchMap } from 'rxjs';

const url = '/api/validation';

export const blackListValidator: (http: HttpClient) => AsyncValidatorFn =
  (http) => (control) => {
    console.log('blackList validation', control);
    const params = new HttpParams().set('word', control.value);
    return of(undefined).pipe(
      switchMap(() =>
        http.get<boolean>(url, {
          params,
        })
      ),
      map((isValid) => {
        console.log('isValid: ', isValid);
        if (isValid) {
          return null;
        }
        return { blackList: { blackListedWord: control.value } };
      }),
      catchError(() => {
        // in case of error send positive answer (no validation error)
        return of(null);
      })
    );
  };
