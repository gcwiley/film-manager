import { Component } from '@angular/core';

// import angular material modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

// import the web app logo
import { LogoComponent } from '../logo/logo.component';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrl: './navbar.component.scss',
   standalone: true,
   imports: [MatIconModule, MatButtonModule, MatMenuModule, LogoComponent],
})
export class NavbarComponent {}
