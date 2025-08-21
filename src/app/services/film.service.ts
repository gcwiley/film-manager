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
  query,
  orderBy,
  limit,
  startAfter,
} from '@angular/fire/firestore';
import { deleteDoc, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

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

  // GET ALL FILMS
  public getFilms(): Observable<Film[]> {
    const filmsRef = collection(this.firestore, 'films');
    return from(getDocs(filmsRef)).pipe(
      map((querySnapshot) => {
        const films: Film[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<Film, 'id'>;
          films.push({ id: doc.id, ...data });
        });
        return films;
      }),
      catchError((error) => {
        console.error('Error fetching films:', error);
        return of([]);
      })
    );
  }

  

  // ADD NEW FILM
  public addFilm(film: FilmInput): Observable<Film> {
    return from(
      addDoc(collection(this.firestore, 'films'), {
        title: film.title,
        director: film.director,
        releaseDate: film.releaseDate,
        genre: film.genre,
        favorite: film.favorite,
        summary: film.description,
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
  public getFilmById(id: string): Observable<Film | undefined> {
    const docReference = doc(this.firestore, 'films', id);
    return from(getDoc(docReference)).pipe(
      map((doc) => {
        if (doc.exists()) {
          return { id, ...doc.data() } as Film;
        }
        return undefined;
      }),
      catchError((error) => {
        console.error(`Error fetching film with ID ${id}:`, error);
        return of(undefined);
      })
    );
  }

  // DELETE FILM BY ID
  public deleteFilmById(id: string): Observable<void> {
    const ref = doc(this.firestore, 'films', id);
    return from(deleteDoc(ref)).pipe(
      catchError((error) => {
        console.error(`Error deleting film with ID ${id}:`, error);
        throw error;
      })
    );
  }

  // UPDATE FILM BY ID
  public updateFilmById(id: string, body: Partial<Film>): Observable<void> {
    const docReference = doc(this.firestore, 'films', id);
    return from(updateDoc(docReference, { ...body })).pipe(
      catchError((error) => {
        console.error(`Error updating film with ID ${id}:`, error);
        throw error;
      })
    );
  }
}
