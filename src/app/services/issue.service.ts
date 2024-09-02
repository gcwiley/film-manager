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
   query,
   orderBy,
   limit,
} from '@angular/fire/firestore';

import { Observable, from, map } from 'rxjs';

// import the issue interface
import { Issue } from '../types/issue.interface';

@Injectable({
   providedIn: 'root',
})
export class IssueService {
   // inject the firestore in the film service constructor
   constructor(private firestore: Firestore) {}

   // Get all issues from firestore database
   getAllIssues(): Observable<Issue[]> {
      // name of the collection within the datebase
      const collectionName = 'issues';
      // create a reference to the firestore collection using the collection name and the firestore instance
      const myCollection = collection(this.firestore, collectionName);
      // comment here
      return from(getDocs(myCollection)).pipe(
         map((querySnapshot) => {
            // this interates over each document (doc) in the querySnapshot and applies a transformation to each
            return querySnapshot.docs.map((doc) => {
               // this extracts the data from the document
               const data = doc.data();
               // this creates a issue object for each document, populating its properties with the data from the document and the document ID
               return {
                  id: doc.id,
                  title: data['title'],
                  category: data['category'],
                  status: data['status'],
                  description: data['description'],
                  createdBy: data['createdBy'],
                  updatedBy: data['updatedBy'],
               };
            });
         })
      );
   }

   // GET an individual issue by ID
   getIssueById(id: string): Observable<Issue | Error> {
      // name of collection
      const collectionName = 'issues';
      // create a reference to issue collection
      const docRef = doc(this.firestore, collectionName, id);
      return from(getDoc(docRef)).pipe(
         map((docSnapshot) => {
            // error checking code
            if (docSnapshot.exists()) {
               const data = docSnapshot.data();
               return {
                  id: docSnapshot.id,
                  title: data['title'],
                  category: data['category'],
                  status: data['status'],
                  description: data['description'],
                  createdBy: data['createdBy'],
                  updatedBy: data['updatedBy'],
               } as Issue;
            } else {
               return new Error(`Issue with ID ${id} was not found.`);
            }
         })
      );
   }

   // GET issue count from database
   getIssueCount(): Observable<number> {
      const collectionName = 'issues';
      const myCollection = collection(this.firestore, collectionName);
      return from(getDocs(myCollection)).pipe(
         map((querySnapshot) => {
            return querySnapshot.size;
         })
      );
   }

   
}
