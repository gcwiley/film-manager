import { Injectable } from '@angular/core';

// import firestore
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc } from '@angular/fire/firestore';

@Injectable({
   providedIn: 'root',
})
export class IssueService {
   // inject the firestore instance in the issue service constructor
   constructor(private firestore: Firestore) {}

   // GET: all issues from database
   getIssues(): void {
      // add code here
   }

   // SAVE METHODS

   // POST: fix this later
   addIssue(): void {
      // add more code
   }

   async deleteIssue(collectionName: string, docId: string) {
      const myDocRef = doc(this.firestore, collectionName, docId);

      await deleteDoc(myDocRef);
   }
}
