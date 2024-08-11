import { AfterViewInit, Component, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import mat paginator and mat sort
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// import mat dialog here
import {
   MatDialog,
   MatDialogActions,
   MatDialogClose,
   MatDialogContent,
   MatDialogRef,
   MatDialogTitle,
} from '@angular/material/dialog';

// import the film service
import { FilmService } from '../../services/film.service';

// import the film interface
import { Film } from '../../types/film.interface';

@Component({
   selector: 'app-film-table',
   templateUrl: './film-table.component.html',
   styleUrl: './film-table.component.scss',
   standalone: true,
   imports: [
      CommonModule,
      MatRippleModule,
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      RouterModule,
      MatPaginator,
   ],
})
export class FilmTableComponent implements AfterViewInit {
   // inject MatDialog
   readonly dialog = inject(MatDialog);

   // setup pagination for table
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   // set up sort in table
   @ViewChild(MatSort) sort!: MatSort;

   // set the loading spinner to true
   isLoadingResults = true;

   // set up data source
   dataSource = new MatTableDataSource<Film>();

   // columns to display
   columnsToDisplay = ['update', 'update'];

   // comment
   constructor(private filmService: FilmService, private router: Router) {}

   // comment here
   ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // get films here
   }

   // get all films from film service
   getFilms(): void {
      this.filmService.getFilms().subscribe((films) => {
         this.dataSource.data = films;
         this.isLoadingResults = false;
      });
   }

   // open dialog window
   openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(FilmTableDialogComponent, {
         width: '250px',
         enterAnimationDuration,
         exitAnimationDuration,
      });
   }

   // deletes a film
   onDeleteFilm(id: string): void {
      this.filmService.deleteFilm(id).subscribe(() => {
         // navigates admin back to the admin page
         this.router.navigateByUrl('/admin');
      });
   }
}

@Component({
   selector: 'app-film-table-dialog',
   templateUrl: './film-table-dialog.html',
   standalone: true,
   imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmTableDialogComponent {
   readonly dialogRef = inject(MatDialogRef<FilmTableDialogComponent>);
}
