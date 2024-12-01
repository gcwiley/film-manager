import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatListModule } from '@angular/material/list';

// import the film interface
import { Film } from '../../types/film.interface';

// import the film service
import { FilmService } from '../../services/film.service';

@Component({
    selector: 'app-film-details',
    templateUrl: './film-details.component.html',
    styleUrl: './film-details.component.scss',
    imports: [CommonModule, MatListModule]
})
export class FilmDetailsComponent implements OnInit {
   film!: Film;

   constructor(private route: ActivatedRoute, private filmService: FilmService) {}

   ngOnInit(): void {
      this.getFilm();
   }

   // GET film by id
   getFilm(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.filmService.getFilmById(id).subscribe((film) => {
         // check if the returned value is an error before assigning it to this.film
         if (film instanceof Error) {
            // handle the error, e.g. display an error message
            console.error(film.message);
         } else {
            this.film = film;
         }
      });
   }
}
