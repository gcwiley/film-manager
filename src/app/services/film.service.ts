import { Injectable } from '@angular/core';

// import firestore
import {
   Firestore,
   collection,
   addDoc,
   setDoc,
   doc,
   updateDoc,
   deleteDoc,
   getDocs,
   getDoc,
} from '@angular/fire/firestore';

// observable: this is the foundation of RxJS. It respresents a stream of values over time. You can think of it like a collection that arrives over time, rather than all at once.
// from: This function is used to create an Observable from a variety of sources, such as arrays, promises, or iterables. it takes the source data and emits its values as an observable stream.
// map:
import { Observable, from, map } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class FilmService {
   // inject the firestore instance in the film service constructor
   constructor(private firestore: Firestore) {}

   // GET: all films from database
   async getFilms(collectionName: string) {
      // creates a reference to the collection
      const myCollection = collection(this.firestore, collectionName);
      // retrieves all documents from the collection
      const querySnapshot = await getDocs(myCollection);

      // extracts the documents data and ID into an array
      const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return documents;
   }

   // defines a method that takes a collection name and returns an Observable that emits an array of documents.
   getAllDocsAsObservable(collectionName: string): Observable<object[]> {
      const myCollection = collection(this.firestore, collectionName);
      return from(getDocs(myCollection)).pipe(
         map((querySnapshot) => {
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
         })
      );
   }

   // GET: an individual film by ID
   async getFilmById(collectionName: string, docId: string) {
      // creates a reference to the collection
      const myDocRef = doc(this.firestore, collectionName, docId);

      const docSnap = await getDoc(myDocRef);

      if (docSnap.exists()) {
         console.log('Document data:', docSnap.data());
         return docSnap.data();
      } else {
         // doc.data() will be undefined in this case
         console.log('No such document!');
         return null;
      }
   }

   // GET: films whose name contains search term - SEARCH FILM
   searchFilms(): void {
      // add more code here
   }

   // GET: film count from database
   getFilmCount(): void {
      // add code here
   }

   // GET: recently film added to database
   getRecentlyCreatedFilms(): void {
      // more code here
   }

   // GET: featured films for carousel

   // SAVE METHODS

   // add new film to firestore database
   async addFilm(collectionName: string, data: unknown) {
      const myCollection = collection(this.firestore, collectionName);
      // adds a new document to a collection with an auto-generated ID
      const docRef = await addDoc(myCollection, data);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id; // return the document ID
   }

   async deleteFilmById(collectionName: string, docId: string) {
      // the doc method creates a reference to a specific document within a firestore collection
      const myDocRef = doc(this.firestore, collectionName, docId);

      // Deletes the document referred to by the specified DocumentReference.
      await deleteDoc(myDocRef)
         .then(() => console.log('Document successfully deleted!'))
         .catch((error) => console.error('Error removing document: ', error));
   }

   // update a film in firestore database - dont use this one!
   async updateFilm(collectionName: string, docId: string, data: unknown) {
      // the doc() method creates a reference to a specific document within a firestore collection
      const myDocRef = doc(this.firestore, collectionName, docId);
      await setDoc(myDocRef, data);
      console.log('Document written with ID: ', myDocRef.id);
   }

   // update a film in firestore database
   async updateFilmById(collectionName: string, docId: string, data: object) {
      // use the doc() method creates a reference to a specific document within a firestore collection
      const myDocRef = doc(this.firestore, collectionName, docId);

      await updateDoc(myDocRef, data)
         .then(() => console.log('Document successfully updated'))
         .catch((error) => console.error('Error updating document: ', error));
   }
}
