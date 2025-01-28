import { Injectable, inject } from '@angular/core';
import {
   Firestore,
   QueryConstraint,
   addDoc,
   collection,
   doc,
   getDoc,
   getDocs,
   limit,
   orderBy,
   query,
   updateDoc,
   where,
} from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { Observable, combineLatest, from, map, switchMap, of } from 'rxjs';
import { catchError } from 'rxjs';
import { Pagination } from '../types/pageination.interface';
import { FilmDto, FilmInputDto } from '../types/film.interface';

interface FilmListInput {
   page: number;
   limit: number;
   sort: keyof FilmDto;
   order: 'asc' | 'desc';
   query: string;
}

@Injectable({
   providedIn: 'root',
})
export class FilmService {
   private firestore: Firestore = inject(Firestore);

   // fetches a paginated list of films from firestore based on the provided 'input'
   // it supports sorting, ordering, and filtering, returning the films as an Observable stream.
   public getFilms(input: FilmListInput): Observable<Pagination<FilmDto>> {
      // creates a reference to the films collection within firestore
      const filmsRef = collection(this.firestore, 'films');

      // this code is constructing an array of constraints to be used in a firestore query.
      // - sort: order the results based on a field (input.sort), in ascending or descending order (input.order)
      // - limit: restrict the number of results to a certain maximum (input.limit)
      const queryConstraints: QueryConstraint[] = [orderBy(input.sort, input.order), limit(input.limit)];

      if (input.query) {
         queryConstraints.push(
            where(input.sort, '>=', input.query.toLowerCase()),
            where(input.sort, '<=', input.query.toLowerCase() + '\uf8ff')
         );
      }

      const queryRef = query(filmsRef, ...queryConstraints);

      // fetches all the docs in the collection, then counts how many - res.size returns the number of items in the collection
      const totalCounts$ = from(getDocs(filmsRef)).pipe(map((res) => res.size));
      // fetches the documents that match the constraints previously provided, then maps to the doc.data() adding an id to them.
      const items$ = from(getDocs(queryRef)).pipe(
         map((res) => {
            // initializes an empty array
            const array: FilmDto[] = [];
            res.forEach((doc) => {
               const data = doc.data() as Omit<FilmDto, 'id'>;
               // creates a new object of type FilmDto, adding the id property to it
               array.push({ id: doc.id, ...data });
            });
            return array;
         }),
         // if there is an error, it will return an observabled with that error
         catchError((error) => of(error))
      );

      // combines the count and the items into a single object.
      return combineLatest([totalCounts$, items$]).pipe(
         map(([totalCount, items]) => {
            return {
               items,
               totalCount,
            };
         })
      );
   }

   // creates a new film in firestore
   public addFilm(film: FilmInputDto): Observable<FilmDto> {
      return from(
         addDoc(collection(this.firestore, 'films'), {
            ...film,
         })
      ).pipe(
         switchMap((doc) => from(getDoc(doc))),
         map((doc) => {
            const data = doc.data() as Omit<FilmDto, 'id'>;
            return { id: doc.id, ...data };
         })
      );
   }

   // fetches a single film from firestore based on the provided id
   public getFilmById(id: string): Observable<FilmDto> {
      const reference = doc(this.firestore, 'films', id);
      return from(getDoc(reference)).pipe(map((doc) => ({ id, ...doc.data() } as FilmDto)));
   }

   // deletes a film from firestore based on the provided id
   public deleteFilmById(id: string): Observable<void> {
      const ref = doc(this.firestore, 'films', id);
      return from(deleteDoc(ref)).pipe(map(() => undefined));
   }

   // updates an existing film in firestore based on the provided id and a partial FilmDto
   public updateFilmById(id: string, body: Partial<FilmDto>): Observable<FilmDto> {
      const ref = doc(this.firestore, 'films', id);
      return from(updateDoc(ref, { ...body })).pipe(switchMap(() => this.getFilmById(id)));
   }
}
