import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { AsyncBtnComponent, ClockComponent } from '@gestionstock/widgets';
import { Observable, delay, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncBtnComponent, ClockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  faHome = faHome;

  doSomething(): Observable<void> {
    return of(undefined).pipe(delay(2000));
  }
}
