import { Component } from '@angular/core';

// shared components
import { NavbarComponent, FooterComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
  imports: [NavbarComponent, FooterComponent],
})
export class ResetPasswordPageComponent {}
