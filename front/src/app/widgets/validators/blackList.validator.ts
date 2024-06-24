import { ValidationErrors, ValidatorFn } from '@angular/forms';

type Options = { matchCase: boolean };

type BlackListFn = (
  blackList: string[],
  options?: Partial<Options>,
) => ValidatorFn;

export const blackListValidator: BlackListFn =
  (blackList, options) =>
  (control): ValidationErrors | null => {
    const defaultOptions: Options = { matchCase: true };
    const opts: Options = { ...defaultOptions, ...options };

    if (typeof control.value !== 'string') {
      return { blackList: 'please give me a string...' };
    }

    const value = opts.matchCase ? control.value : control.value.toLowerCase();
    const bl = opts.matchCase
      ? blackList
      : blackList.map((s) => s.toLowerCase());

    if (bl.includes(value)) {
      return { blackList: `Comment ça ${value} ???` };
    }
    return null;
  };
