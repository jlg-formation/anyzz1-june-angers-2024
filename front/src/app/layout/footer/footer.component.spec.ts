import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to legal', (done) => {
    router = TestBed.inject(Router);
    const link = fixture.debugElement.nativeElement.querySelector('a');
    link.click();

    fixture.whenStable().then(() => {
      expect(router.routerState.snapshot.url).toEqual('/legal');
      done();
    });

    expect(component).toBeTruthy();
  });
});
