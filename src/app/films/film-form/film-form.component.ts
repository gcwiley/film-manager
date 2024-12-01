import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// import the film service
import { FilmService } from '../../services/film.service';

// import the film interface
import { Film } from '../../types/film.interface';

@Component({
    selector: 'app-film-form',
    templateUrl: './film-form.component.html',
    styleUrl: './film-form.component.scss',
    imports: [
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
export class FilmFormComponent implements OnInit {
   filmForm!: FormGroup;
   filmId!: string;

   constructor(
      private formBuilder: FormBuilder,
      private filmService: FilmService,
      private route: ActivatedRoute,
      private router: Router
   ) {}

   ngOnInit(): void {
      // get film id from route
      this.filmId = this.route.snapshot.paramMap.get('id'!);
      this.filmService.getFilmById(this.filmId).subscribe((film) => {
         this.createForm(film)
      })
   }

   // comment
   createForm(film: Film): void {
      this.filmForm = this.formBuilder.group({
         title: [film.title, Validators.required],
         director: [film.director, Validators.required],
         releaseDate: [film.releaseDate, Validators.required],
         genre: [film.genre, Validators.required],
         summary: [film.summary, Validators.required]
      })
   }

  
}
