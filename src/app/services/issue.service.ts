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

// import the rxjs functions
import { Observable, from, map, switchMap } from 'rxjs';

// import the issue DTOs
import { IssueDto, IssueInputDto } from '../dto/issue.dto';

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
   getIssueByIdTest(id: string): Observable<Issue | Error> {
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

   // GET 10 most recently added issues from database
   getRecentlyCreatedIssues(): Observable<Issue[]> {
      // specifies the collection name
      const collectionName = 'issues';
      // creates a collection reference
      const myCollection = collection(this.firestore, collectionName);
      // builds a query using the query method
      const q = query(myCollection, orderBy('created', 'desc'), limit(10));
      // retrieves the documents using getDocs
      return from(getDocs(q)).pipe(
         map((querySnapshot) => {
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Issue));
         })
      );
   }

   // SAVE METHODS

   // ADD METHOD - RETURNS OBSERVABLE
   addIssue(data: Issue): Observable<Issue> {
      const collectionName = 'issues';
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

   // get issue by id
   public getIssueById(id: string): Observable<IssueDto> {
      // gets the reference to the doc by it's id
      const ref = doc(this.firestore, 'issues', id);
      // comment
      return from(getDoc(ref)).pipe(map((doc) => ({ id, ...doc.data() } as IssueDto)));
   }

   // delete a issue by id
   public deleteIssueById(id: string): Observable<void> {
      // gets the reference to the doc(issue) by it's id
      const ref = doc(this.firestore, 'issues', id);
      // deletes the document in the database by it's id
      return from(deleteDoc(ref)).pipe(map(() => undefined));
   }

   // update a issue by id
   public updateIssueById(id: string, body: Partial<IssueDto>): Observable<IssueDto> {
      // gets the reference to the doc by it's id
      const ref = doc(this.firestore, 'issues', id);
      // updates fields in document
      return from(updateDoc(ref, { ...body })).pipe(switchMap(() => this.getIssueById(id)));
   }
}
