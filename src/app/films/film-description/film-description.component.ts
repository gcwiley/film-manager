import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// film service and interface
import { FilmService } from '../../services/film.service';
import { FilmDto } from '../../types/film.interface';

@Component({
  standalone: true,
  selector: 'app-film-description',
  templateUrl: './film-description.component.html',
  styleUrl: './film-description.component.scss',
})
export class FilmDescriptionComponent implements OnInit {
  film!: FilmDto;

  constructor(private route: ActivatedRoute, private filmService: FilmService) {}

  ngOnInit(): void {
    this.getFilm();
  }

  // GET film by Id
  getFilm(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.filmService.getFilmById(id).subscribe((film) => {
      this.film = film;
    });
  }
}
