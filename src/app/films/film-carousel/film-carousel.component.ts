import { ChangeDetectionStrategy, Component, input, ViewChild } from '@angular/core';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// film type
import { Film } from '../../types/film.interface';
import { SimpleTruncatePipe } from '../../pipes';

@Component({
  standalone: true,
  selector: 'app-film-carousel',
  templateUrl: './film-carousel.component.html',
  styleUrl: './film-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class FilmCarouselComponent {
  public films = input<Film[]>([])

  @ViewChild

  public nextSlide(): void {
    
  }
}
