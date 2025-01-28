import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

// import angular material
import { MatCardModule } from '@angular/material/card';
import { MatRipple } from '@angular/material/core';

// import the API
import { ApiService } from '../../services/api.service';
import { FilmDto } from '../../types/film.interface';

@Component({
   standalone: true,
   selector: 'app-film-list',
   templateUrl: './film-list.component.html',
   styleUrl: './film-list.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterModule, MatCardModule, MatRipple],
})
export class FilmListComponent implements OnInit {
   public films = signal<FilmDto[]>([]);

   constructor(private apiService: ApiService) {}

   // fix this with ng Onit - fix this
   public ngOnInit(): void {
      this.getFilms();
   }

   public getFilms(): void {
      this.apiService.getFilms().subscribe((films) => {
         this.films.set(films);
      });
   }
}
