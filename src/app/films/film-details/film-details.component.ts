import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatListModule } from '@angular/material/list';

// import the film type
import { Film } from '../../types/film.interface';

// import the film service
import { FilmService } from '../../services/film.service';

@Component({
   selector: 'app-film-details',
   templateUrl: './film-details.component.html',
   styleUrl: './film-details.component.scss',
   standalone: true,
   imports: [CommonModule, MatListModule],
})
export class FilmDetailsComponent implements OnInit {
   film!: Film | undefined;

   constructor(private route: ActivatedRoute, private filmService: FilmService) {}

   ngOnInit(): void {
      this.getFilm();
   }

   // get film by id
   getFilm(): void {
      window.alert('Get Film')
   }
}
