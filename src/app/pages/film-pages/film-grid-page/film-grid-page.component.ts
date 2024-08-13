import { Component } from '@angular/core';

// import angular material
import { MatDividerModule } from '@angular/material/divider';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../../shared';

// import the film grid component
import { FilmGridComponent } from '../../../films';

@Component({
   selector: 'app-film-grid-page',
   templateUrl: './film-grid-page.component.html',
   styleUrl: './film-grid-page.component.scss',
   standalone: true,
   imports: [MatDividerModule, NavbarComponent, AnnouncementBannerComponent, FooterComponent, FilmGridComponent],
})
export class FilmGridPageComponent {
   text = 'this is a test!'
}
