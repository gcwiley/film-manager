import { Directive, EventEmitter, HostListener, Output, input, inject } from '@angular/core';
import { filter, first, switchMap } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// film service and confirm dialog service
import { FilmService } from '../services/film.service';
import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  selector: '[appFilmDelete]',
  standalone: true,
})
export class FilmDeleteDirective {
  public id = input.required<string>({ alias: 'appFilmDelete' });

  @Output() public deleted = new EventEmitter<string>();

  // initializes the directives dependencies.
  private filmService = inject(FilmService);
  private confirm = inject(CustomConfirmDialogService);
  private snackBar = inject(MatSnackBar);

  @HostListener('click')
  public onClick(): void {
    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        first(),
        filter((res) => !!res),
        switchMap(() => this.filmService.deleteFilmById(this.id()))
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          // opens a success snackbar
          this.snackBar.open('Film successfully deleted.', 'Close', { duration: 5000 });
        },
        // if the deletion fails, it opens a "failed" snackbar
        error: (error) => {
          // log error to console
          console.error('Unable to delete film.', error);
          this.snackBar.open('Unable to delete film.', 'Close', { duration: 5000 });
        },
      });
  }
}
