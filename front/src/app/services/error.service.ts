import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, map, of, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getMessage(f: FormGroup, fieldname: string) {
    console.log('running getMessage on', fieldname);
    const control = f.controls[fieldname];
    if (!control) {
      throw new Error('control does not exist');
    }
    if (control.valid) {
      return '';
    }
    if (control.errors?.['required']) {
      return 'Champ requis';
    }
    if (control.errors?.['blackList']) {
      return `Mot interdit (${control.errors?.['blackList'].blackListedWord})`;
    }
    return '';
  }

  getErrors(f: FormGroup, fieldname: string): Observable<string> {
    console.log('getErrors');
    return f.controls[fieldname].valueChanges.pipe(
      startWith(f.controls[fieldname].value),
      map((value) => {
        console.log('value: ', value);
        return this.getMessage(f, fieldname);
      })
    );
  }
}
