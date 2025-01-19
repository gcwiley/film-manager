import { Directive, EventEmitter, HostListener, Output, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, first, switchMap } from 'rxjs';

@Directive({
   selector: '[appFilmDelete]',
   standalone: true,
})
export class FilmDeleteDirective {
   public id = input.required<string>({ alias: 'appFilmDelete' });
   @Output() public deleted = new EventEmitter<string>();

   constructor() {}
}
