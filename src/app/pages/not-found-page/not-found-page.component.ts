import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// shared components
import { NavbarComponent, FooterComponent } from '../../components';

// angular material
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent,
    MatButtonModule,
  ],
})
export class NotFoundPageComponent {}
