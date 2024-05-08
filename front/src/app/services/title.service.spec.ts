import { TestBed } from '@angular/core/testing';

import { Router, provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { TitleService } from './title.service';

describe('TitleService', () => {
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    service = TestBed.inject(TitleService);
  });

  it('should be Gestion Stock for home page', () => {
    const router = TestBed.inject(Router);
    service.updateTitle(router.routerState.snapshot);
    expect(document.title).toEqual('Gestion Stock');
  });

  it('should be Gestion Stock for legal page', (done) => {
    const router = TestBed.inject(Router);
    router.navigateByUrl('/legal').then(() => {
      service.updateTitle(router.routerState.snapshot);
      expect(document.title).toEqual('Gestion Stock - Mentions Légales');
      done();
    });
  });
});
