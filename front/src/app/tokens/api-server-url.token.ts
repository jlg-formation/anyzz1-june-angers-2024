import { InjectionToken } from '@angular/core';

export const API_SERVER_URL = new InjectionToken<string>('API_SERVER_URL', {
  factory: () => '',
});
