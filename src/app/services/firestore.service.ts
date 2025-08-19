import { Injectable, inject } from '@angular/core';

// firestore
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';

// rxjs
import { Observable, from, map, switchMap, of, catchError } from 'rxjs';

// film interface
import { Film, FilmInput } from '../types/film.interface';
Injectable({
  providedIn: 'root',
});
export class FirestoreService {
  // inject dependencies
  private firestore = inject(Firestore);

  // GET ALL FILMS
  public getFilms(): Observable<Film[]> {
    // create a reference to the 'films' collection
    const filmsRef = collection(this.firestore, 'films');
    // getDocs() returns a promise, so we use from() to convert it into an observable
    return from(getDocs(filmsRef)).pipe(
      map((querySnapshot) => {
        // create an empty array of film type
        const films: Film[] = [];
        // map the document to an array of film objects
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<Film, 'id'>;
          films.push({ id: doc.id, ...data });
        });
        return films;
      }),
      // a catchError block is included to log any potential errors during the fetch operation and return an empty array, preventing your application from crashing.
      catchError((error) => {
        // log the error and return an empty array as a safe fallback
        console.error('Error fetching films:', error);
        return of([]);
      })
    );
  }

  // creates a new film in firestore
  public addFilm(film: FilmInput): Observable<Film> {
    return from(
      addDoc(collection(this.firestore, 'films'), {
        title: film.title,
        director: film.director,
        releaseDate: film.releaseDate,
        genre: film.genre,
        favorite: film.favorite,
        summary: film.summary,
      })
    ).pipe(
      switchMap((doc) => from(getDoc(doc))),
      map((doc) => {
        const data = doc.data() as Omit<Film, 'id'>;
        return { id: doc.id, ...data };
      })
    );
  }

  // GET FILM BY ID
  // fetches a single film from firestore based on the provided id
  // returns an observable that emits a Film object if found, or undefined if not found
  // includes error handling for the Firestore operation
  public getFilmById(id: string): Observable<Film | undefined> {
    const docReference = doc(this.firestore, 'films', id);
    return from(getDoc(docReference)).pipe(
      map((doc) => {
        if (doc.exists()) {
          // map data, assuming it matches the Film interface structure
          return { id, ...doc.data() } as Film;
        }
        // return undefine if the document does not exist
        return undefined;
      }),
      catchError((error) => {
        console.error(`Error fetching film with ID ${id}:`, error);
        // Re-throw the error, or return an observable of undefined/null depending on desired behavior
        // Returning undefined here treats a fetch error the same as "not found", which might not be ideal.
        // A more robust approach might be to throw a specific error or let the subscriber handle it.
        // For simplicity and consistency with the "not found" case returning undefined,
        // returning Observable<undefined> here also makes the type Observable<Film | undefined> consistent.
        return of(undefined);
        // Or, re-throw to let the subscriber handle: throw error;
        // Or, return an error observable: return throwError(() => new Error(`Failed to fetch film ${id}`))
      })
    );
  }

  // DELETE FILM BY ID
  // deletes a film from firestore based on the provided id - DELETE FILM
  public deleteFilmById(id: string): Observable<void> {
    const ref = doc(this.firestore, 'films', id);
    return from(deleteDoc(ref)).pipe(
      catchError((error) => {
        console.error(`Error deleting film with ID ${id}:`, error);
        // re-throw the error to let the subscriber handle it, or return an error observable
        throw error;
        // Or, return throwError(() => new Error(`Failed to delete film ${id}`)); // Need throwError from rxjs
      })
    );
  }

  // UPDATE BY ID
  // updates an existing film in firestore based on the provided id and a partial FilmDto
  public updateFilmById(id: string, body: Partial<Film>): Observable<void> {
    const docReference = doc(this.firestore, 'films', id);
    return from(updateDoc(docReference, { ...body })).pipe(
      catchError((error) => {
        console.error(`Error updating film with ID ${id}:`, error);
        // re-throw the error to let the subscriber handle it, or return an error observable.
        throw error;
        // Or, return throwError(() => new Error(`Failed to update film ${id}`)); // Need throwError from rxjs
      })
    );
  }
}
