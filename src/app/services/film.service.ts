import { Injectable } from '@angular/core';

// import the firestore functions
import {
   Firestore,
   collection,
   addDoc,
   doc,
   updateDoc,
   deleteDoc,
   getDocs,
   getDoc,
   query,
   orderBy,
   limit,
} from '@angular/fire/firestore';

// import the rxjs functions
import { Observable, from, map, switchMap } from 'rxjs';

// import the film DTO
import { FilmDto, FilmInputDto } from '../dto/film.dto';

@Injectable({
   providedIn: 'root',
})
export class FilmService {
   // inject the firestore instance in the film service constructor
   constructor(private firestore: Firestore) {}

   // GET: all films from firestore database
   // this function retrieves all documents from a specified Firestore collection and transforms them into an array of film objects.
   getAllFilms(): Observable<Film[]> {
      // name of the collection within the database
      const collectionName = 'films';
      // creates a reference to the firestore collection using the collection name and the firestore instance.
      const myCollection = collection(this.firestore, collectionName);
      // - this is where the data fetching and transformation happens
      // - getDocs() retreieves all documents from the specified collection. it returns a promise.
      // - from() converts the Promise returned by getDocs into an Observable
      // - pipe() this allow applying RxJS operators to transform the emitted data
      return from(getDocs(myCollection)).pipe(
         // this operator transforms the emitted 'QuerySnapshot' (which contain the retrieved documents) into an array of film objects.
         map((querySnapshot) => {
            // this interates over each document (doc) in the querySnapshot and applies a transformation to each
            return querySnapshot.docs.map((doc) => {
               // this extracts the data from the document
               const data = doc.data();
               // this creates a film object for each document, populating it properties with the data from the document and the document ID.
               return {
                  id: doc.id,
                  title: data['title'],
                  director: data['director'],
                  releaseDate: data['releaseDate'],
                  genre: data['genre'],
                  summary: data['summary'],
                  createdAt: data['createdAt'],
                  updatedAt: data['updatedAt'],
               } as Film;
            });
         })
      );
   }

   // GET: an individual film by ID - returns an observable
   getFilmByIdTest(id: string): Observable<Film | Error> {
      // comment here
      const collectionName = 'films';
      // create a reference to the films collection
      const docRef = doc(this.firestore, collectionName, id);
      return from(getDoc(docRef)).pipe(
         map((docSnapshot) => {
            // error checking code
            if (docSnapshot.exists()) {
               const data = docSnapshot.data();
               return {
                  id: docSnapshot.id,
                  title: data['title'],
                  director: data['director'],
                  releaseDate: data['releaseDate'],
                  genre: data['genre'],
                  summary: data['summary'],
                  createdAt: data['createdAt'],
                  updatedAt: data['updatedAt'],
               } as Film;
            } else {
               return new Error(`Film with ID ${id} was not found`);
            }
         })
      );
   }

   // GET: film count from database
   getFilmCount(): Observable<number> {
      const collectionName = 'films';
      const myCollection = collection(this.firestore, collectionName);
      return from(getDocs(myCollection)).pipe(
         map((querySnapshot) => {
            return querySnapshot.size;
         })
      );
   }

   // GET: 10 most recented added films from database
   getRecentlyCreatedFilms(): Observable<Film[]> {
      // specifies the collection name
      const collectionName = 'films';
      // creates a collection reference
      const myCollection = collection(this.firestore, collectionName);
      // builds a query using the query method
      const q = query(myCollection, orderBy('createdAt', 'desc'), limit(10));
      // retrieves the documents using getDocs
      return from(getDocs(q)).pipe(
         map((querySnapshot) => {
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Film));
         })
      );
   }

   // SAVE METHODS

   // ADD METHOD - RETURNS OBSERVABLE
   addFilm(data: Film): Observable<Film> {
      const collectionName = 'films';
      const myCollection = collection(this.firestore, collectionName);
      return from(addDoc(myCollection, data)).pipe(
         map((docRef) => {
            // check if data already has an id property
            if (data.id) {
               return data; // if it does, just return the data as is
            } else {
               // use object.assign to avoid overwriting
               return Object.assign({}, data, { id: docRef.id });
            }
         })
      );
   }

   // get film by id
   public getFilmById(id: string): Observable<FilmDto> {
      // gets the reference to the doc by it's id
      const ref = doc(this.firestore, 'films', id);
      // comment
      return from(getDoc(ref)).pipe(map((doc) => ({ id, ...doc.data() } as FilmDto)));
   }

   // delete a film by id
   public deleteFilmById(id: string): Observable<void> {
      // get the reference to the doc by it's id
      const ref = doc(this.firestore, 'films', id);
      // deletes the film in the database by it's id
      return from(deleteDoc(ref)).pipe(map(() => undefined));
   }

   // update a film by id
   public updateFilmById(id: string, body: Partial<FilmDto>): Observable<FilmDto> {
      const ref = doc(this.firestore, 'films', id);
      // updates field in document
      return from(updateDoc(ref, { ...body })).pipe(switchMap(() => this.getFilmById(id)))
   }
}
