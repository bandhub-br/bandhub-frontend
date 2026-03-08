import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['./app.component.css'],
  template: `<router-outlet />`
})
export class AppComponent {
  title = 'bandhub-frontend-app';
}
