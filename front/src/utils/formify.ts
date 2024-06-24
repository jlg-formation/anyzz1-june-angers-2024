import { AbstractControl } from '@angular/forms';

export type Formify<T> = { [key in keyof T]: AbstractControl<T[key]> };
