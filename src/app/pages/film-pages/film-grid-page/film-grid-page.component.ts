import { Component } from '@angular/core';

// import the film service
import { FilmService } from '../../../services/film.service';

@Component({
   selector: 'app-film-grid-page',
   templateUrl: './film-grid-page.component.html',
   styleUrl: './film-grid-page.component.scss',
   standalone: true,
   imports: [],
})
export class FilmGridPageComponent {
   // create the member variables
   films: object[] = [];

   constructor(private filmService: FilmService) {}

   getFilms(): void {
      this.filmService.getAllDocsAsObservable('films').subscribe((films) => {
         this.films = films;
      });
   }
}
