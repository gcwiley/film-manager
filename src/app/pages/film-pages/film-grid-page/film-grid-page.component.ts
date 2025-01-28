import { Component } from '@angular/core';

// import angular material
import { MatDividerModule } from '@angular/material/divider';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../../components';

// import the film grid component
import { FilmListComponent } from '../../../films';

@Component({
   selector: 'app-film-grid-page',
   templateUrl: './film-grid-page.component.html',
   styleUrl: './film-grid-page.component.scss',
   imports: [MatDividerModule, NavbarComponent, AnnouncementBannerComponent, FooterComponent, FilmListComponent],
})
export class FilmGridPageComponent {}
