import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// import the angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import the film service
import { FilmService } from '../../services/film.service';

// import the film interface
import { Film } from '../../types/film.interface';
import { RouterModule } from '@angular/router';
import { SimpleTruncatePipe } from '../../pipes';

@Component({
   selector: 'app-film-grid',
   templateUrl: './film-grid.component.html',
   styleUrl: './film-grid.component.scss',
   standalone: true,
   imports: [
      CommonModule,
      RouterModule,
      MatGridListModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      SimpleTruncatePipe,
   ],
})
export class FilmGridComponent implements OnInit {
   // create thge member variables
   films: Film[] = [];

   cols = 5;
   rowHeight = '1:1';
   gutterSize = '0px';

   // comment here
   colspan = 1;
   rowspan = 1;

   constructor(private filmService: FilmService, private breakpointObserver: BreakpointObserver) {}

   getFilms(): void {
      this.filmService.getFilms().subscribe((films) => {
         this.films = films
      })
   }
}
