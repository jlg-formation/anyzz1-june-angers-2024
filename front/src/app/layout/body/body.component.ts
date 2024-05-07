import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  standalone: true,
  imports: [RouterOutlet],
})
export class BodyComponent {}
