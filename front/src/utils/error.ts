import { AbstractControl } from '@angular/forms';

export const getErrorMessage = (control: AbstractControl): string => {
  if (control.touched && control.errors) {
    if (control.errors['required']) {
      return 'Champ obligatoire';
    }
    if (control.errors['maxlength']) {
      const actual = control.errors['maxlength'].actualLength;
      const max = control.errors['maxlength'].requiredLength;
      return `Champ trop long (${actual} > ${max}).`;
    }
  }
  return '';
};
