import { Injectable } from '@angular/core';

// import firestore
import {
   Firestore,
   collection,
   addDoc,
   doc,
   updateDoc,
   deleteDoc,
   getDocs,
   getDoc,
   orderBy,
   query,
   limit
} from '@angular/fire/firestore';

@Injectable({
   providedIn: 'root',
})
export class FilmService {
   // inject the firestore instance in the film service constructor
   constructor(private firestore: Firestore) {}

   // GET: all films from firestore database
   async getFilms() {
      const collectionName = 'films'
      // creates a reference to the collection
      const myCollection = collection(this.firestore, collectionName);
      // retrieves all documents from the collection
      const querySnapshot = await getDocs(myCollection);
      // extracts the documents data and ID into an array
      const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return documents;
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

   // GET: film count from database
   async getFilmCount(collectionName: string): Promise<number> {
      // creates a reference to the specified collection in firestore
      const myCollection = collection(this.firestore, collectionName);
      // retrieves all documents from the collection
      const queryShapshot = await getDocs(myCollection);
      // returns the count of documents
      return queryShapshot.size;
   }

   // GET: recently 10 most recented added films from database
   async getRecentlyCreatedFilms(collectionName: string): Promise<object[]> {
      // creates a reference to the specified collection in firestore
      const myCollection = collection(this.firestore, collectionName)
      // creates a query that orders the documents by a 'createdAt' field in descending order (newest first) and limits the results to 10
      const q = query(myCollection, orderBy('createdAt', 'desc'), limit(10));
      // executes the query and retrieves the documents
      const queryShapshot = await getDocs(q);
      // extracts the documents data and ID into an array
      return queryShapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
   }

   // SAVE METHODS

   // add new film to firestore database
   async addFilm(data: unknown) {
      const collectionName = 'films';
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

   // update a film in firestore database
   async updateFilmById(docId: string, data: object) {
      const collectionName = 'films';
      // use the doc() method creates a reference to a specific document within a firestore collection
      const myDocRef = doc(this.firestore, collectionName, docId);

      await updateDoc(myDocRef, data)
         .then(() => console.log('Document successfully updated'))
         .catch((error) => console.error('Error updating document: ', error));
   }
}
