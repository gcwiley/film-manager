import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// angular cdk
import { SelectionModel } from '@angular/cdk/collections';

// angular material
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

// rxjs
import { Subject, takeUntil } from 'rxjs';

// film service and interface
import { FilmService } from '../../services/film.service';
import { Film } from '../../types/film.interface';

@Component({
  standalone: true,
  selector: 'app-film-table',
  templateUrl: './film-table.component.html',
  styleUrl: './film-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    RouterModule,
  ],
})
export class FilmTableComponent implements AfterViewInit, OnDestroy {
  selection = new SelectionModel<Film>(true, []);

  // setup pagination for film table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // set up sort in table
  @ViewChild(MatSort) sort!: MatSort;

  // set the loading spinner to true
  isLoadingResults = true;

  // set the new data source
  dataSource = new MatTableDataSource<Film>();

  columnsToDisplay = ['title', 'director', 'releaseDate', 'genre', 'openFilm', 'editFilm'];

  // subject to manage component destruction
  private destroy$ = new Subject<void>();

  // inject dependencies
  private filmService = inject(FilmService);
  private snackBar = inject(MatSnackBar);

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getFilms();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // get all films from film service
  public getFilms(): void {
    this.filmService.getFilms().subscribe((films) => {
      this.dataSource.data = films;
      // sets the loading results to false
      this.isLoadingResults = false;
    });
  }

  // get all films from film service
  public getFilmsTest(): void {
    this.isLoadingResults = true;
    this.filmService
      .getFilms()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (films) => {
          this.dataSource.data = films;
          this.isLoadingResults = false;
        },
        error: (error) => {
          console.error('Error fetching films:', error);
          this.isLoadingResults = false; // stop the spinner
          this.snackBar.open('Error fetching films:', 'Close', {
            duration: 5000,
          });
        },
      });
  }
}
