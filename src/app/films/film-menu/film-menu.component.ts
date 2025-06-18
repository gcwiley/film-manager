import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material

@Component({
  standalone: true,
  selector: 'app-film-menu',
  templateUrl: './film-menu.component.html',
  styleUrl: './film-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class FilmMenuComponent {}
