import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { API_SERVER_URL } from './tokens/api-server-url.token';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: API_SERVER_URL, useValue: 'http://localhost:3000' },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
