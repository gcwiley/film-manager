import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return authState(this.auth).pipe(
      take(1),
      map((user) => {
        if (user) {
          return true; // user is logged in, allow access
        } else {
          // user is not logged in, redirect to signin page
          return this.router.createUrlTree(['/signin']);
        }
      })
    );
  }
}
