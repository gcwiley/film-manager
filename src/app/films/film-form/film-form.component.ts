import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// import rxjs
import { first } from 'rxjs';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// film service and interface
import { FilmService } from '../../services/film.service';
import { FilmInput, Film } from '../../types/film.interface';

@Component({
  standalone: true,
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrl: './film-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public mode = 'create';
  private id!: string | null;
  private film!: Film | undefined;

  // inject dependencies
  private formBuilder = inject(FormBuilder);
  private filmService = inject(FilmService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // create the film form
  filmForm = this.formBuilder.group({
    title: ['', Validators.required],
    director: ['', Validators.required],
    releaseDate: ['', Validators.required],
    genre: ['', Validators.required],
    summary: ['', Validators.required],
  });

  // this is the ngOnInit lifecycle hook in angular. it's called once the component has been initialized
  public ngOnInit(): void {
    // find out if we have an 'id' or not
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // this checks if the paramMap contains a parameter named 'id'
      if (paramMap.has('id')) {
        // if a 'id' paramater exists, the component sets its internal mode property to 'edit'. This means its intended to edit an existing film.
        this.mode = 'edit';
        // retrieves the value of the 'id' paramater from the paramMap
        this.id = paramMap.get('id');
        this.filmService.getFilmById(this.id!).subscribe((film) => {
          this.film = film;
          this.filmForm.setValue({
        
            title: this.film!.title,
            director: this.film!.director,
            releaseDate: this.film!.releaseDate,
            genre: this.film!.genre,
            summary: this.film!.summary,
          });
        });
        // if the paramMap does NOT ha block is executed.
      } else {

        this.mode = 'create';
      }
    });
  }

  // save a new film to firestore
  public onSaveFilm(): void {
    if (this.mode === 'create') {
      this.filmService
        .addFilm(this.filmForm.value as FilmInput)
        .pipe(first())
        .subscribe({
          next: (film) => {
            // resets the form
            this.filmForm.reset(film);
            // displays a success message
            this.snackBar.open('Film added', 'Close', { duration: 30000 });
            // navigates user back to homepage
            this.router.navigateByUrl('/');
          },
          error: () => {
            this.snackBar.open('Error', 'Close', { duration: 30000 });
          },
        });
    } else {
      this.filmService
        .updateFilmById(this.id!, this.filmForm.value as FilmInput)
        .subscribe(() => {
          // navigates user back to homepage
          this.router.navigateByUrl('/');
        });
    }
  }
}
