import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular material modules
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// import the film service
import { FilmService } from '../../services/film.service';


@Component({
   selector: 'app-recent-films',
   templateUrl: './recent-films.component.html',
   styleUrl: './recent-films.component.scss',
   standalone: true,
   imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentFilmsComponent implements OnInit {
   recentFilms!: object[];

   constructor(private filmService: FilmService) {}

   ngOnInit(): void {
      this.getRecentFilms()
   }

   getRecentFilms(): void {
      this.filmService.getRecentlyCreatedFilms('films').then((films) => (this.recentFilms = films));
   }
}
