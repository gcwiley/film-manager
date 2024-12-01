import { Component, OnInit } from '@angular/core';

// import angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import carousel items
import { CarouselComponent, CarouselItemDirective } from '../carousel/carousel.component';

// import the film service
import { FilmService } from '../../services/film.service';

// import the film interface 
import { Film } from '../../types/film.interface';

@Component({
    selector: 'app-carousel-container',
    templateUrl: './carousel-container.component.html',
    styleUrl: './carousel-container.component.scss',
    imports: [MatIconModule, MatButtonModule, CarouselComponent, CarouselItemDirective]
})
export class CarouselContainerComponent implements OnInit {

  films: Film[] = [];

  // inject the film service
  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.getFilms()
  }

  getFilms(): void {
    this.filmService.getRecentlyCreatedFilms().subscribe((films) => {
      this.films = films
    })
  }


}
