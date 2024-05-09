import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

export const filterInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((httpEvent) => {
      if (!(httpEvent instanceof HttpResponse)) {
        return httpEvent;
      }
      const response = httpEvent;

      if (response.body instanceof Array) {
        const body = response.body.filter((item) => {
          const str = JSON.stringify(item);
          if (str.includes('hidden')) {
            return false;
          }
          return true;
        });
        return response.clone({ body });
      }
      return response;
    })
  );
};
