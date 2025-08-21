import { ChangeDetectionStrategy, Component, input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// film type
import { Film } from '../../types/film.interface';

@Component({
  standalone: true,
  selector: 'app-film-carousel',
  templateUrl: './film-carousel.component.html',
  styleUrl: './film-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class FilmCarouselComponent {
  public films = input<Film[]>([]);

  @ViewChild('filmCarouselWrapper') filmCarouselWrapper!: ElementRef<HTMLDivElement>;

  public nextSlide(): void {
    const scrollAmount = this.filmCarouselWrapper.nativeElement.offsetWidth;
    this.filmCarouselWrapper.nativeElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  public previousSlide(): void {
    const scrollAmount = this.filmCarouselWrapper.nativeElement.offsetWidth;
    this.filmCarouselWrapper.nativeElement.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
}
