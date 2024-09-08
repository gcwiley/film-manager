import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
   standalone: true,
   imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FormsModule,
      ReactiveFormsModule,
   ],
})
export class FilmFormComponent implements OnInit {
   formBuilder = inject(FormBuilder);

   public mode = 'create';
   private id!: string;
   private film!: Film;

   constructor(private router: Router, public route: ActivatedRoute, private filmService: FilmService) {}

   // create the film form
   filmForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      releaseDate: ['', Validators.required],
      genre: ['', Validators.required],
      summary: ['', Validators.required],
   });

   ngOnInit(): void {
      // find out if we have an "id" or not
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
         if (paramMap.has('id')) {
            this.mode = 'edit';
            this.id = paramMap.get('id');
            this.filmService.getFilmById(this.id).subscribe((film) => {
               this.film = film;
               // overrides values of initial form controls
               this.filmForm.setValue({
                  // set value for every form control
                  title: this.film.title,
                  director: this.film.director,
                  releaseDate: this.film.releaseDate,
                  genre: this.film.genre,
                  summary: this.film.summary,
               });
            });
         } else {
            this.mode = 'create';
            this.id = null;
         }
      });
   }

   onSaveFilm(): void {
      if (this.mode === 'create') {
         this.filmService.addFilm(this.filmForm.value).subscribe(() => {
            // navigates user back to the homepage
            this.router.navigateByUrl('/')
         })
      } else {
         this.filmService.updateFilmById(this.id, this.filmForm.value).subscribe(() => {
            // navigates user back to the homepage
            this.router.navigateByUrl('/')
         })
      }
   }
}
