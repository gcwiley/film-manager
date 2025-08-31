import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';

// import rxjs
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

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
import { FilmInput } from '../../types/film.interface';

@Component({
  standalone: true,
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrl: './film-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
})
export class FilmFormComponent implements OnInit {
  public mode: 'create' | 'edit' = 'create';
  private id!: string | null;
  private readonly snackBarDuration = 5000;

  // define the genre options
  public genres = [
    { value: 'horror', viewValue: 'Horror' },
    { value: 'comedy', viewValue: 'Comedy' },
    { value: 'sci-fi', viewValue: 'Sci-Fi' },
    { value: 'drama', viewValue: 'Drama' },
    { value: 'action', viewValue: 'Action' },
  ];

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
    description: ['', Validators.required],
  });

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        first(),
        switchMap((paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.mode = 'edit';
            this.id = paramMap.get('id');
            return this.filmService.getFilmById(this.id!);
          } else {
            this.mode = 'create';
            return of(undefined);
          }
        })
      )
      .subscribe((film) => {
        if (film) {
          // use patchValue for safety, and map the data correctly
          this.filmForm.patchValue({
            ...film,
            releaseDate: film.releaseDate ? new Date(film.releaseDate).toISOString() : '',
          });
        }
      });
  }

  public onSaveFilm(): void {
    if (!this.filmForm.valid) {
      return;
    }

    const formValue = this.filmForm.value as FilmInput;

    if (this.mode === 'create') {
      this.filmService
        .addFilm(formValue)
        .pipe(first())
        .subscribe({
          next: () => {
            this.snackBar.open('Film added', 'Close', { duration: this.snackBarDuration });
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open('Error adding film', 'Close', { duration: this.snackBarDuration });
          },
        });
    } else {
      this.filmService
        .updateFilmById(this.id!, formValue)
        .pipe(first())
        .subscribe({
          next: () => {
            this.snackBar.open('Film updated successfully', 'Close', {
              duration: this.snackBarDuration,
            });
            this.router.navigate(['/films', this.id]);
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open('Error updating film', 'Close', { duration: this.snackBarDuration });
          },
        });
    }
  }

  public onCancel(): void {
    this.router.navigateByUrl(this.mode === 'edit' ? `/films/${this.id}` : '/');
  }
}
