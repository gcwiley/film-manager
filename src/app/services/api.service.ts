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
   deleteDoc,
} from '@angular/fire/firestore';

import { Observable, combineLatest, from, map, switchMap } from 'rxjs';

import { Pagination } from '../shared/dto/pagination.dto';
import { FilmDto, FilmInputDto } from '../shared/dto/film.dto';

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
export class ApiService {
   // comment
   private firestore: Firestore = inject(Firestore);

   // comment
   public list(input: FilmListInput): Observable<Pagination<FilmDto>> {
      const filmsRef = collection(this.firestore, 'films');

      const queryConstraints: QueryConstraint[] = [orderBy(input.sort, input.order), limit(input.limit)];

      if (input.query) {
         queryConstraints.push(
            where(input.sort, '>=', input.query.toLowerCase()),
            where(input.sort, '<=', input.query.toLowerCase() + '\uf8ff')
         );
      }
   }

   // updates a film by id
   public updateFilmById(id: string, body: Partial<FilmDto>) {
      const ref = doc(this.firestore, 'films', id);
      return from(updateDoc(ref, { ...body }));
   }

   // deletes a film by id
   public deleteFilmById(id: string): Observable<void> {
      // creates the reference to films collection
      const reference = doc(this.firestore, 'films', id);
      return from(deleteDoc(reference)).pipe(map(() => undefined));
   }
}
