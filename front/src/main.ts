import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { isDevMode } from '@angular/core';

const noop = (): void => {
  return undefined;
};

if (!isDevMode()) {
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
