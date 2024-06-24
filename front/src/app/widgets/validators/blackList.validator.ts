import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { BlacklistService } from '../../services/blacklist.service';

type Options = { matchCase: boolean };

type BlackListFn = (
  blackListService: BlacklistService,
  options?: Partial<Options>,
) => ValidatorFn;

export const blackListValidator: BlackListFn =
  (blackListService, options) =>
  (control): ValidationErrors | null => {
    const defaultOptions: Options = { matchCase: true };
    const opts: Options = { ...defaultOptions, ...options };

    const blackList = blackListService.blackList;

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
