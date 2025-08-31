import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared component
import { NavbarComponent, MenuComponent, FooterComponent } from '../../../components';

// film components
import { FilmFormComponent, RecentFilmsComponent } from '../../../films/index';

@Component({
  standalone: true,
  selector: 'app-film-create-page',
  templateUrl: './film-create-page.component.html',
  styleUrl: './film-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    MenuComponent,
    FooterComponent,
    FilmFormComponent,
    RecentFilmsComponent,
  ],
})
export class FilmCreatePageComponent {}
