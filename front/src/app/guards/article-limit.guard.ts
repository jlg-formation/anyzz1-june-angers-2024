import { CanActivateFn } from '@angular/router';

export const articleLimitGuard: CanActivateFn = (route, state) => {
  console.log('articleLimitGuard');
  return true;
};
