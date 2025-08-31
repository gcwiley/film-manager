import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavbarComponent,  MenuComponent, FooterComponent } from '../../../components';

// film components
import { FilmDetailsComponent, FilmDescriptionComponent } from '../../../films';

@Component({
    standalone: true,
    selector: 'app-film-details-page',
    templateUrl: './film-details-page.component.html',
    styleUrl: './film-details-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NavbarComponent,
        MenuComponent,
        FooterComponent,
        FilmDetailsComponent,
        FilmDescriptionComponent,
    ]
})
export class FilmDetailsPageComponent {}
