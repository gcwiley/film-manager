import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';

// angular material
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginator,
    RouterModule,
  ],
})
export class FilmTableComponent implements AfterViewInit {
  // setup pagination for table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // set up sort in table
  @ViewChild(MatSort) sort!: MatSort;

  // set the loading spinner to true
  isLoadingResults = true;

  // set the new data source
  dataSource = new MatTableDataSource<Film>();

  // columns to display
  columnsToDisplay = ['title', 'director', 'releaseDate', 'genre'];

  // inject dependencies
  private filmService = inject(FilmService);
  private router = inject(Router);

  public ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getFilms()
  }

  // get all films from the film service
  public getFilms(): void {
    this.filmService.getFilms().subscribe((films) => {
      this.dataSource.data = films;
      // sets the loading results to false
      this.isLoadingResults = false;
    })
  }
}
