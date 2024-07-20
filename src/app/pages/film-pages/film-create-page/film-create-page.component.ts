import { Component } from '@angular/core';

// import the shared component
import { NavbarComponent, FooterComponent } from '../../../shared'

@Component({
   selector: 'app-film-create-page',
   
   templateUrl: './film-create-page.component.html',
   styleUrl: './film-create-page.component.scss',
   standalone: true,
   imports: [NavbarComponent, FooterComponent],
})
export class FilmCreatePageComponent {}
