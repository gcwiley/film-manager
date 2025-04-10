import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // used for async pipe
import { Observable } from 'rxjs';
import { map } from 'rxjs';

// import the auth service
import { AuthService } from '../../services/auth.service';

// import angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
})
export class AuthStatusComponent {
  private authService = inject(AuthService);

  // expose the isAuthenticated observable from ther service
  public isLoggedIn$: Observable<boolean> = this.authService.isAuthenticated$;

  // expose user email (assuming A)
  public userEmail$: Observable<string | null> = this.authService.user$.pipe(
    map((user) => user?.email ?? null)
  );
}
