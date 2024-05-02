import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { BlacklistService } from '../services/blacklist.service';

export const blackListValidator: (
  blackListService: BlacklistService
) => ValidatorFn =
  (blackListService) =>
  (control): ValidationErrors | null => {
    console.log('blackList validation', control);
    const blackList = blackListService.blackList;
    if (blackList.has(control.value)) {
      return { blackList: { blackListedWord: control.value } };
    }
    return null;
  };
