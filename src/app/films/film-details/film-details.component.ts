import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';

// film service and inteface
import { FilmService } from '../../services/film.service';
import { Film } from '../../types/film.interface';

@Component({
  standalone: true,
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, DatePipe, MatListModule],
})
export class FilmDetailsComponent implements OnInit, OnDestroy {
  film!: Film; // initialize explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction
  public hasError = false;
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {}

  public ngOnInit(): void {
    this.getFilmById();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getFilmById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Film ID not found in route parameters.');
      this.hasError = true;
      this.isLoading = false;
      return;
    }
    this.filmService
      .getFilmById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (film) => {
          this.film = film;
        },
        error: (error) => {
          this.hasError = true,
          console.error('Error fetching film details:', error);
        },
      });
  }
}
