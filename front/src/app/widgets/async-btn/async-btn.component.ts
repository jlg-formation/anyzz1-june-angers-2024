import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Observable, catchError, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-async-btn',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './async-btn.component.html',
  styleUrl: './async-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncBtnComponent {
  @Input()
  label = '';

  @Input()
  icon = faCircleNotch;

  @Input()
  action: Observable<void> = of(undefined);

  @Output()
  error = new EventEmitter<string>();

  @Input()
  disabled = false;

  @Input({
    alias: 'primary',
    transform: (value: string) => value === '',
  })
  isPrimary = false;

  doAction(...args: unknown[]) {
    console.log('args: ', args);
    of(undefined)
      .pipe(
        tap(() => {
          this.isDoing.set(true);
          this.error.emit('');
        }),
        switchMap(() => this.action),
        catchError((err) => {
          console.log('err: ', err);
          if (err instanceof Error) {
            this.error.emit(err.message);
          } else {
            this.error.emit('Erreur Technique');
          }
          return of(undefined);
        }),
        finalize(() => {
          this.isDoing.set(false);
        })
      )
      .subscribe();
  }

  isDoing = signal(false);
  faCircleNotch = faCircleNotch;
}
