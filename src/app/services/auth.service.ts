import { Injectable } from '@angular/core';

// comment here
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, signOut } from '@angular/fire/auth';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // injects the auth object
   constructor(private auth: Auth) {}

   // signs in the user with email and password
   async signInWithEmailAndPassword(email: string, password: string) {
      return await signInWithEmailAndPassword(this.auth, email, password);
   }

   // Creates a new user account associated with the specified email address and password.
   async createUserWithEmailAndPassword(email: string, password: string) {
      return await createUserWithEmailAndPassword(this.auth, email, password);
   }

   // Asynchronously signs in as an anonymous user.
   async signInAnonymously() {
      return await signInAnonymously(this.auth);
   }

   // sign out of application
   async signOut() {
      return await signOut(this.auth);
   }
}
