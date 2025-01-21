import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// import angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
   standalone: true,
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrl: './navbar.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterModule],
})
export class NavbarComponent {}
