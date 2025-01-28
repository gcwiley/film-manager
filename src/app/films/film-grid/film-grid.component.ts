import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

// import the angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import the api interface
import { ApiService } from '../../services/api.service';
import { FilmDto } from '../../types/film.interface';

@Component({
    selector: 'app-film-grid',
    templateUrl: './film-grid.component.html',
    styleUrl: './film-grid.component.scss',
    imports: [
        CommonModule,
        RouterModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
    ]
})
export class FilmGridComponent implements OnInit {
   films: FilmDto[] = [];

   cols = 5;
   rowHeight = '1:1';
   gutterSize = '0px';
   colspan = 1;
   rowspan = 1;

   // inject the film service
   constructor(private filmService: ApiService, private breakpointObserver: BreakpointObserver) {}

   public ngOnInit(): void {
      this.getFilms();
      this.layoutChanges();
   }

   // responsive code
   public layoutChanges(): void {
      this.breakpointObserver
         .observe([
            Breakpoints.TabletPortrait,
            Breakpoints.TabletLandscape,
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
         ])
         .subscribe((result) => {
            const breakpoints = result.breakpoints;
            if (breakpoints[Breakpoints.TabletPortrait]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.HandsetPortrait]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.HandsetLandscape]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.TabletLandscape]) {
               this.cols = 2;
            }
         });
   }

   public getFilms(): void {
      this.filmService.getFilms().subscribe((films) => {
         this.films = films;
      });
   }
}
