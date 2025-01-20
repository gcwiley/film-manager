import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../../components';

// import the film components
import { FilmDetailsComponent, FilmDescriptionComponent } from '../../../films';

@Component({
    selector: 'app-film-details-page',
    templateUrl: './film-details-page.component.html',
    styleUrl: './film-details-page.component.scss',
    imports: [
        NavbarComponent,
        AnnouncementBannerComponent,
        FooterComponent,
        FilmDetailsComponent,
        FilmDescriptionComponent,
    ]
})
export class FilmDetailsPageComponent {}
