import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export default class LegalComponent {
  clock = toSignal(
    interval(1000).pipe(
      startWith(new Date()),
      map(() => new Date()),
      tap((x) => {
        console.log('x: ', x);
      }),
    ),
  );
}
