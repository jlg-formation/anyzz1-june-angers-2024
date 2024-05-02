import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
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
  getErrors(f: FormGroup, fieldname: string): Observable<string> {
    console.log('getErrors');
    const control = f.controls[fieldname];
    return control.valueChanges.pipe(
      startWith(control.value),
      map((value) => {
        console.log('value: ', value);
        return getMessage(control.errors);
      })
    );
  }
}
