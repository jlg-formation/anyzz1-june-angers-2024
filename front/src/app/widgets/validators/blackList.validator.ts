import {
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { BlacklistService } from '../../services/blacklist.service';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

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
