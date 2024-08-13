import { Injectable } from '@angular/core';

// import firestore
import { Firestore, collection, addDoc, doc, deleteDoc, getDocs } from '@angular/fire/firestore';

@Injectable({
   providedIn: 'root',
})
export class IssueService {
   // inject the firestore instance in the issue service constructor
   constructor(private firestore: Firestore) {}
}
