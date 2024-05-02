import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, map, of, startWith, tap } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getErrors<T extends { [K in keyof T]: AbstractControl<any> }>(
    f: FormGroup<T>
  ): { [keys in keyof T]: Observable<string> } {
    console.log('getErrors');
    const result = {} as {
      [keys in keyof T]: Observable<string>;
    };
    for (const name in f.controls) {
      const control = f.controls[name];
      result[name as keyof T] = control.valueChanges.pipe(
        startWith(control.value),
        map((value) => {
          console.log('value: ', value);
          return getMessage(control.errors);
        })
      );
    }

    return result;
  }
}
