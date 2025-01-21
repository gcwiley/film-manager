import { CdkPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// import rxjs
import { first } from 'rxjs';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// import the film service
import { FilmService } from '../../services/film.service';
import { BreadcrumbsPortalService } from '../../services/breadcrumbs-portal.service';

// import the film interface
import { FilmInputDto } from '../../types/film.interface';

@Component({
   standalone: true,
   selector: 'app-film-form',
   templateUrl: './film-form.component.html',
   styleUrl: './film-form.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
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
   @ViewChild(CdkPortal, { static: true }) public portalContent!: CdkPortal;

   constructor(
      private formBuilder: FormBuilder,
      private filmService: FilmService,
      private breadcrumbsPortalService: BreadcrumbsPortalService,
      private router: Router,
      private snackbar: MatSnackBar,
      private cdr: ChangeDetectorRef
   ) {}

   // create the film form
   filmForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      releaseDate: ['', Validators.required],
      genre: ['', Validators.required],
      summary: ['', Validators.required],
   });

   public ngOnInit(): void {
      setTimeout(() => {
         this.breadcrumbsPortalService.setPortal(this.portalContent);
         this.cdr.markForCheck();
      });
   }

   // save a new film
   public onSaveFilm(): void {
      this.filmService
         .addFilm(this.filmForm.value as FilmInputDto)
         .pipe(first())
         .subscribe({
            next: (film) => {
               this.filmForm.reset(film);
               this.snackbar.open('Success', 'Close');
               // navigate user back to homepage
               this.router.navigateByUrl('/');
            },
            error: () => {
               this.snackbar.open('Error', 'Close');
            },
         });
   }

   // comment
   public onReset(event: Event): void {
      event.preventDefault();
      this.filmForm.reset();
   }
}
