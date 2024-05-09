import { HttpInterceptorFn } from '@angular/common/http';

export const filterInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
