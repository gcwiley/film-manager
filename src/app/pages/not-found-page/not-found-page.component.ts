import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// import the shared components
import { NavbarComponent, FooterComponent } from '../../components';

// import the angular material modules
import { MatButtonModule } from '@angular/material/button';

@Component({
   standalone: true,
   selector: 'app-not-found-page',
   templateUrl: './not-found-page.component.html',
   styleUrl: './not-found-page.component.scss',
   imports: [RouterModule, NavbarComponent, FooterComponent, MatButtonModule],
})
export class NotFoundPageComponent {}
