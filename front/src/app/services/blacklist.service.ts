import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlacklistService {
  blackList = new Set(['zut', 'crotte']);

  constructor() {}
}
