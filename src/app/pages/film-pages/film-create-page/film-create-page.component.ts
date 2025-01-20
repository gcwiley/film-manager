import { Component } from '@angular/core';

// import the shared component
import { NavbarComponent, FooterComponent } from '../../../components';

// import the film components
import { FilmFormComponent, RecentFilmsComponent } from '../../../films/index';

@Component({
    selector: 'app-film-create-page',
    templateUrl: './film-create-page.component.html',
    styleUrl: './film-create-page.component.scss',
    imports: [NavbarComponent, FooterComponent, FilmFormComponent, RecentFilmsComponent]
})
export class FilmCreatePageComponent {}
