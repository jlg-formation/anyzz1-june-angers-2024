import { ChangeDetectorRef } from '@angular/core';
import { AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { BlacklistService } from '../../services/blacklist.service';

type BlackListFn = (
  blackListService: BlacklistService,
  cdref: ChangeDetectorRef,
) => AsyncValidatorFn;

export const blackListValidator: BlackListFn =
  (blackListService, cdref) =>
  (control): Observable<ValidationErrors | null> => {
    if (typeof control.value !== 'string') {
      return of(null);
    }

    return of(undefined).pipe(
      switchMap(() => blackListService.isInvalid(control.value)),
      map((isInvalid) => {
        if (isInvalid) {
          return {
            blackList: `Comment ca ${control.value}`,
          };
        }
        return null;
      }),
      tap(() => {
        cdref.markForCheck();
      }),
    );
  };
