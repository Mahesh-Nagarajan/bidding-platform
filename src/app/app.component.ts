import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutesModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    AppRoutesModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'online-bidding-platform';
}
