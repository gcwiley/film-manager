import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { NavbarComponent, MenuComponent, FooterComponent } from '../../../components';

// film components
import { FilmGridComponent } from '../../../films';

@Component({
  standalone: true,
  selector: 'app-film-grid-page',
  templateUrl: './film-grid-page.component.html',
  styleUrl: './film-grid-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDividerModule, NavbarComponent, MenuComponent, FooterComponent, FilmGridComponent],
})
export class FilmGridPageComponent {}
