import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

const prefix = 'Gestion Stock';

@Injectable({
  providedIn: 'root',
})
export class TitleService extends TitleStrategy {
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    document.title = title !== undefined ? `${prefix} - ${title}` : prefix;
  }
}
