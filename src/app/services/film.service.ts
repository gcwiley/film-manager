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

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  // inject dependencies
  private firestore: Firestore = inject(Firestore);

  // FETCH ALL FILM FROM FIRESTORE DATABASE - FETCH ALL FILMS
  // fetches all documents from the 'films' collection in Firestore
  // returns an observable that emits an array of film objects
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
        ...film,
      })
    ).pipe(
      switchMap((doc) => from(getDoc(doc))),
      map((doc) => {
        const data = doc.data() as Omit<Film, 'id'>;
        return { id: doc.id, ...data };
      })
    );
  }

  // fetches a single film from firestore based on the provided id - fix this!
  public getFilmById(id: string): Observable<Film> {
    const docReference = doc(this.firestore, 'films', id);
    return from(getDoc(docReference)).pipe(map((doc) => ({ id, ...doc.data() } as Film)));
  }

  // fetches a sigle film from firestore based on the provided id
  public getFilmByIdTest(id: string): Observable<Film | undefined> {
    const docReference = doc(this.firestore, 'films', id);
    return from(getDoc(docReference)).pipe(
      map((doc) => {
        if (doc.exists()) {
          return { id, ...doc.data() } as Film;
        }
        return undefined
      })
    )
  }


  // deletes a film from firestore based on the provided id
  public deleteFilmById(id: string): Observable<void> {
    const ref = doc(this.firestore, 'films', id);
    return from(deleteDoc(ref)).pipe(map(() => undefined));
  }

  // updates an existing film in firestore based on the provided id and a partial FilmDto
  public updateFilmById(id: string, body: Partial<Film>): Observable<Film> {
    const ref = doc(this.firestore, 'films', id);
    return from(updateDoc(ref, { ...body })).pipe(switchMap(() => this.getFilmById(id)));
  }
}
