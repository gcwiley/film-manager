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
import { Observable, combineLatest, from, map, switchMap } from 'rxjs';
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
   public getFilms(input: FilmListInput): Observable<Pagination<FilmDto>> {
      const filmsRef = collection(this.firestore, 'films');

      const queryConstraints: QueryConstraint[] = [orderBy(input.sort, input.order), limit(input.limit)];

      if (input.query) {
         queryConstraints.push(
            where(input.sort, '>=', input.query.toLowerCase()),
            where(input.sort, '<=', input.query.toLowerCase() + '\uf8ff')
         );
      }

      const queryRef = query(filmsRef, ...queryConstraints);

      const totalCounts$ = from(getDocs(filmsRef)).pipe(map((res) => res.size));
      const items$ = from(getDocs(queryRef)).pipe(
         map((res) => {
            const arr: FilmDto[] = [];
            res.forEach((doc) => {
               const data = doc.data() as Omit<FilmDto, 'id'>;
               arr.push({ id: doc.id, ...data });
            });
            return arr;
         })
      );

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
      const ref = doc(this.firestore, 'films', id);
      return from(getDoc(ref)).pipe(map((doc) => ({ id, ...doc.data() } as FilmDto)));
   }

   // deletes a film from firestore based on the provided id
   public deleteFilmById(id: string): Observable<void> {
      const ref = doc(this.firestore, 'posts', id);
      return from(deleteDoc(ref)).pipe(map(() => undefined));
   }

   // updates an existing film in firestore based on the provided id and a partial FilmDto
   public updateFilmById(id: string, body: Partial<FilmDto>): Observable<FilmDto> {
      const ref = doc(this.firestore, 'films', id);
      return from(updateDoc(ref, { ...body })).pipe(switchMap(() => this.getFilmById(id)));
   }
}
