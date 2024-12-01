import { Injectable } from '@angular/core';

// import firebase auth
import { Auth } from '@angular/fire/auth';
import { AuthPipeGenerator, loggedIn } from '@angular/fire/auth-guard';

import { user } from 'rxfire/auth';
import { Observable, map, take } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class CustomAuthGuard {
   constructor() {}
}
