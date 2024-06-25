import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, merge, startWith, map } from 'rxjs';

const getErrorMessage = (errors: ValidationErrors | null): string => {
  if (errors === null) {
    return '';
  }
  if (errors['required']) {
    return 'Champ obligatoire';
  }
  if (errors['maxlength']) {
    const actual = errors['maxlength'].actualLength;
    const max = errors['maxlength'].requiredLength;
    return `Champ trop long (${actual} > ${max}).`;
  }
  if (errors['blackList']) {
    return errors['blackList'];
  }
  return '';
};

export const getErrors = <
  T extends { [K in keyof T]: AbstractControl<unknown> },
>(
  f: FormGroup<T>,
  doCheck: Observable<void>,
): { [keys in keyof T]: Signal<string | undefined> } => {
  const result = {} as {
    [keys in keyof T]: Signal<string | undefined>;
  };
  for (const name in f.controls) {
    const control = f.controls[name];
    result[name as keyof T] = toSignal(
      merge(control.statusChanges, doCheck).pipe(
        startWith(control.status),
        map(() => {
          if (control.untouched) {
            return '';
          }
          return getErrorMessage(control.errors);
        }),
      ),
    );
  }

  return result;
};
