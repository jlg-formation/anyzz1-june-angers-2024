import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
    if (control.untouched || control.valid) {
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
}
