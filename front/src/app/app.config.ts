import { ApplicationConfig } from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { TitleService } from './services/title.service';
import { authInterceptor } from './interceptors/auth.interceptor';
import { filterInterceptor } from './interceptors/filter.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, filterInterceptor])
    ),
    provideClientHydration(),
    {
      provide: TitleStrategy,
      useClass: TitleService,
    },
  ],
};
