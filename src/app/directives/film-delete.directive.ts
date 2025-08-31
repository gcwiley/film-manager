import { Directive, EventEmitter, HostListener, Output, input, inject } from '@angular/core';
import { filter, first, switchMap, catchError, throwError } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// film service and confirm dialog service
import { FilmService } from '../services/film.service';
import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  standalone: true,
  selector: '[appFilmDelete]',
})
export class FilmDeleteDirective {
  public id = input.required<string>({ alias: 'appFilmDelete' });
  private readonly snackBarDuration = 5000;

  @Output() public deleted = new EventEmitter<string>();

  // initialize dependencies.
  private filmService = inject(FilmService);
  private confirm = inject(CustomConfirmDialogService);
  private snackBar = inject(MatSnackBar);

  @HostListener('click')
  public onClick(): void {
    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        first(),
        filter((confirmed) => !!confirmed),
        switchMap(() => this.filmService.deleteFilmById(this.id())),
        catchError((error) => {
          console.error('Error deleting film:', error); // Log the error
          this.snackBar.open('Unable to delete film.', 'Close', { duration: this.snackBarDuration }); 
          return throwError(() => error);
        })
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          this.snackBar.open('Film successfully deleted.', 'Close', { duration: this.snackBarDuration });
        },
      });
  }
}
