import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getMessage(f: FormGroup, fieldname: string) {
    const control = f.controls[fieldname];
    if (!control) {
      throw new Error('control does not exist');
    }
    if (control.untouched || control.valid) {
      return '';
    }
    if (control.invalid) {
      return 'Champ invalide';
    }
    return '';
  }
}
