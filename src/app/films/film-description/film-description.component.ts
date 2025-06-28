import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// rxjs
import { Subject, takeUntil } from 'rxjs';

// film service and interface
import { FilmService } from '../../services/film.service';
import { Film } from '../../types/film.interface';

@Component({
  standalone: true,
  selector: 'app-film-description',
  templateUrl: './film-description.component.html',
  styleUrl: './film-description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class FilmDescriptionComponent implements OnInit, OnDestroy {
  film!: Film; // initialize explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction
  
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
          console.error('Error fetching film description:', error);
        },
      });
  }
}
