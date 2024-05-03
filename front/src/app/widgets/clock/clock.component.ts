import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent {
  realtime$ = interval(1000).pipe(
    map(() => {
      const now = new Date();
      console.log('now: ', now);
      return now;
    })
  );
}
