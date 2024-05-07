import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, tap } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent {
  realtime = new Date();

  constructor(private cdref: ChangeDetectorRef, private ngZone: NgZone) {
    ngZone.runOutsideAngular(() => {
      interval(1000)
        .pipe(
          tap(() => {
            this.ngZone.run(() => {
              const now = new Date();
              console.log('now: ', now);
              this.realtime = now;
              this.cdref.markForCheck();
            });
          }),
          takeUntilDestroyed()
        )
        .subscribe();
    });
  }
}
