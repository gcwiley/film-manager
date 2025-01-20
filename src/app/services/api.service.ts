import { Injectable, inject } from '@angular/core';
import { Firestore, getDocs, collection } from '@angular/fire/firestore';
import { Observable, from, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FilmDto } from '../types/film.interface';

@Injectable({
   providedIn: 'root',
})
export class ApiService {
   // inject firestore
   private firestore: Firestore = inject(Firestore);

   // get all films from firestore - return the result as an observable.
   public getFilms(): Observable<FilmDto[]> {
      // creates a reference to film collection within firestore
      const filmsRef = collection(this.firestore, 'films');
      // comment
      const films = from(getDocs(filmsRef)).pipe(
         map((res) => {
            // initializes an empty array
            const array: FilmDto[] = [];
            res.forEach((doc) => {
               // this line casts doc.data() to the type Omit<FilmDto, 'id'> which means it's expecting an object that looks like a FilmDto, but without the id property
               const data = doc.data() as Omit<FilmDto, 'id'>;
               // creates a new object of type FilmDto, adding the id property to it
               array.push({ id: doc.id, ...data });
            });
            return array;
         }),
         // if there is an error, it will return an observabled with that error.
         catchError((error) => of(error))
      );
      return films;
   }
}
