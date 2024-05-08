import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router, provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to stock', (done) => {
    router = TestBed.inject(Router);
    const link = fixture.debugElement.nativeElement.querySelector('a');
    link.click();

    fixture.whenStable().then(() => {
      expect(router.routerState.snapshot.url).toEqual('/stock');
      done();
    });

    expect(component).toBeTruthy();
  });
});
