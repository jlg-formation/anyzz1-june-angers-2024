import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

const prefix = 'Gestion Stock';

@Injectable({
  providedIn: 'root',
})
export class TitleService extends TitleStrategy {
  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    this.document.title = title !== undefined ? `${prefix} - ${title}` : prefix;
  }
}
