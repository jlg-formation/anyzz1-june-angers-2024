import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, map, merge, startWith } from 'rxjs';

export type FormGroupArgs<T extends {}> = {
  [key in keyof T]: any[];
};

export const getMessage = (errors: ValidationErrors | null) => {
  if (errors === null) {
    return '';
  }
  if (errors?.['required']) {
    return 'Champ requis';
  }
  if (errors?.['blackList']) {
    return `Mot interdit (${errors?.['blackList'].blackListedWord})`;
  }
  return '';
};

export const getErrors = <T extends { [K in keyof T]: AbstractControl<any> }>(
  f: FormGroup<T>,
  doCheck: Observable<void>
): { [keys in keyof T]: Signal<string | undefined> } => {
  const result = {} as {
    [keys in keyof T]: Signal<string | undefined>;
  };
  for (const name in f.controls) {
    const control = f.controls[name];
    result[name as keyof T] = toSignal(
      merge(control.statusChanges, doCheck).pipe(
        startWith(control.status),
        map((value) => {
          console.log('value: ', value);
          if (control.untouched) {
            return '';
          }
          return getMessage(control.errors);
        })
      )
    );
  }

  return result;
};
