import { Injectable } from '@angular/core';

// import firestore
import { Firestore, collection, getDocs, setDoc, doc } from '@angular/fire/firestore';

import { Observable, from, map } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class TestService {
   // inject the firestore instance in the test service constructor
   constructor(private firestore: Firestore) {}

   // test code - defines a method that takes a collection name and returns an observable that emits an array of documents.
   getAllDocsAsObservable(collectionName: string): Observable<object[]> {
      const myCollection = collection(this.firestore, collectionName);
      return from(getDocs(myCollection)).pipe(
         map((querySnapshot) => {
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
         })
      );
   }

   // update a document in a firestore database
   async updateDocument(collectionName: string, docId: string, data: unknown) {
      // doc() method creates a reference to a specific document within a firestore collection
      const myDocRef = doc(this.firestore, collectionName, docId);
      await setDoc(myDocRef, data);
      console.log('Document written with ID: ', myDocRef.id);
   }
}
