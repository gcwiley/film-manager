import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

// shared components
import { LogoComponent } from '../logo/logo.component';

// auth service
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    LogoComponent,
  ],
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  // signs out current user
  public onClickSignOut(): void {
    this.authService.signOutUser().subscribe(() => {
      // redirects user to sign in page
      this.router.navigateByUrl('/signin');
    });
  }
}
