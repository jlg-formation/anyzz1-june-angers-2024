import { HttpInterceptorFn } from '@angular/common/http';

const authToken = 'this is my auth token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(authReq);
};
