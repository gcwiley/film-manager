import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// film service and interface
import { FilmService } from '../../services/film.service';
import { FilmDto } from '../../types/film.interface';

@Component({
  standalone: true,
  selector: 'app-recent-films',
  templateUrl: './recent-films.component.html',
  styleUrl: './recent-films.component.scss',
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentFilmsComponent implements OnInit {
  recentFilms!: FilmDto[];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.getRecentFilms();
  }

  // gets recently created films
  getRecentFilms(): void {}
}
