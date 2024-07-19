import { Injectable, inject } from '@angular/core';

import { Auth, authState, signInWithPopup, signOut, user, getAuth, User } from '@angular/fire/auth';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // comment here
   auth: Auth = inject(Auth);

   constructor() {}

   // signin to application
   signIn() {}

   // sign out of application
   signOut() {}
}
