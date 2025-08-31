import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';

// rxjs
import { Observable } from 'rxjs';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// shared components
import { NavbarComponent, FooterComponent } from '../../components';

// film service and interface
import { FilmService } from '../../services/film.service';
import { Film } from '../../types/film.interface';

// film components
import { FilmCarouselComponent } from '../../films';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NavbarComponent,
    FooterComponent,
    FilmCarouselComponent,
    AsyncPipe,
  ],
})
export class HomePageComponent implements OnInit {
  // inject dependenices
  private filmService = inject(FilmService);

  public featuredFilms$!: Observable<Film[]>;

  public ngOnInit(): void {
    this.featuredFilms$ = this.filmService.getFilms();
  }
}
