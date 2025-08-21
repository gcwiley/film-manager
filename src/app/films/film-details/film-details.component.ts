import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

// rxjs
import { Subject, takeUntil } from 'rxjs';

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
  film: Film | undefined = undefined;

  private destroy$ = new Subject<void>();
  
  // inject dependencies
  private route = inject(ActivatedRoute);
  private filmService = inject(FilmService);

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
          console.error('Error fetching film details:', error);
        },
      });
  }
}
