import { Injectable } from '@angular/core';

// import firestore
import { Firestore, collection, addDoc, doc, deleteDoc, getDocs } from '@angular/fire/firestore';

@Injectable({
   providedIn: 'root',
})
export class IssueService {
   // inject the firestore instance in the issue service constructor
   constructor(private firestore: Firestore) {}

   // GET: all issues from firestore database
   async getIssues(collectionName: string) {
      // creates a reference to the issues collection
      const myCollection = collection(this.firestore, collectionName);
      // retrieves all issues from the collection
      const querySnapshot = await getDocs(myCollection);
      // extracts the documents data and ID into an array
      const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return documents;
   }

   // SAVE METHODS

   // ADD a new issue to firestore database
   async addIssue(collectionName: string, data: unknown) {
      const myCollection = collection(this.firestore, collectionName);
      // adds a new document to a collection with an auto-generated ID
      const docRef = await addDoc(myCollection, data);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id; // return the document ID
   }

   async deleteIssue(collectionName: string, docId: string) {
      // the doc method creates a reference to a specific document within a firestore collection
      const myDocRef = doc(this.firestore, collectionName, docId);

      // Deletes the document referred to by the specified DocumentReference.
      await deleteDoc(myDocRef)
         .then(() => console.log('Document successfully deleted!'))
         .catch((error) => console.error('Error removing document: ', error));
   }
}
