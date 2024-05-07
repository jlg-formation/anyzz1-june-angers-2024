import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostAttributeToken,
  Input,
  Output,
  inject,
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
  setError = new EventEmitter<string>();

  @Input()
  disabled = false;

  isPrimary =
    inject(new HostAttributeToken('primary'), { optional: true }) !== null;

  doAction() {
    of(undefined)
      .pipe(
        tap(() => {
          this.isDoing.set(true);
          this.setError.emit('');
        }),
        switchMap(() => this.action),
        catchError((err) => {
          if (err instanceof Error) {
            this.setError.emit(err.message);
          } else {
            this.setError.emit('Erreur Technique');
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
