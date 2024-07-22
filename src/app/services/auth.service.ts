import { Injectable, inject } from '@angular/core';

import { Auth } from '@angular/fire/auth';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // comment here
   auth: Auth = inject(Auth);

   constructor() {}

   // signin to application
   signIn() {
      window.alert('You have signed in. Not!')
   }

   // sign out of application
   signOut() {}
}
