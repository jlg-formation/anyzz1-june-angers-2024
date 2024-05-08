import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClockComponent } from '../../../../projects/widgets/src/lib/clock/clock.component';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss',
  standalone: true,
  imports: [ClockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LegalComponent {}
