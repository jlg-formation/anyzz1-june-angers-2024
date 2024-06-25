import {
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { BlacklistService } from '../../services/blacklist.service';
import { Observable, map, of, switchMap } from 'rxjs';

type BlackListFn = (blackListService: BlacklistService) => AsyncValidatorFn;

export const blackListValidator: BlackListFn =
  (blackListService) =>
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
    );
  };
