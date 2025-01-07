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
import { Pagination } from '../dto/pagination.dto';
import { IssueDto, IssueInputDto } from '../dto/issue.dto';

interface IssueListInput {
   page: number;
   limit: number;
   sort: keyof IssueDto;
   order: 'asc' | 'desc';
   query: string;
}

@Injectable({
   providedIn: 'root',
})
export class IssueService {
   private firestore: Firestore = inject(Firestore);

   // fetches a paginated list of issues from firestore based on the provided 'input'
   public getIssues(input: IssueListInput): Observable<Pagination<IssueDto>> {
      const issuesRef = collection(this.firestore, 'issues');

      const queryConstraints: QueryConstraint[] = [orderBy(input.sort, input.order), limit(input.limit)];

      if (input.query) {
         queryConstraints.push(
            where(input.sort, '>=', input.query.toLowerCase()),
            where(input.sort, '<=', input.query.toLowerCase() + '\uf8ff')
         );
      }

      const queryRef = query(issuesRef, ...queryConstraints);

      const totalCounts$ = from(getDocs(issuesRef)).pipe(map((res) => res.size));
      const items$ = from(getDocs(queryRef)).pipe(
         map((res) => {
            const arr: IssueDto[] = [];
            res.forEach((doc) => {
               const data = doc.data() as Omit<IssueDto, 'id'>;
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

   // create a new issue in firestore - fix this!
   public addIssue(issue: IssueInputDto): 

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
      const ref = doc(this.firestore, 'issues', id);
      return from(getDoc(ref)).pipe(map((doc) => ({ id, ...doc.data() } as IssueDto)));
   }

   // delete a issue by id
   public deleteIssueById(id: string): Observable<void> {
      const ref = doc(this.firestore, 'issues', id);
      return from(deleteDoc(ref)).pipe(map(() => undefined));
   }

   // update a issue by id
   public updateIssueById(id: string, body: Partial<IssueDto>): Observable<IssueDto> {
      const ref = doc(this.firestore, 'issues', id);
      return from(updateDoc(ref, { ...body })).pipe(switchMap(() => this.getIssueById(id)));
   }
}
