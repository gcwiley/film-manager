import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, UnaryFunction } from 'rxjs';
import { map, take } from 'rxjs/operators';

export type AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthPipe;
export type AuthPipe = UnaryFunction<Observable<User | null>, Observable<boolean | string | unknown[]>>;

export const loggedIn: AuthPipe = map((user) => !!user);

@Injectable({
   providedIn: 'any',
})
export class AuthGuard implements CanActivate {
   constructor(private router: Router, private auth: Auth) {}

   canActivate = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const authPipeFactory = (next.data['authGuardPipe'] as AuthPipeGenerator) || (() => loggedIn);
      return user(this.auth).pipe(
         take(1),
         authPipeFactory(next, state),
         map((can) => {
            if (typeof can === 'boolean') {
               return can;
            } else if (Array.isArray(can)) {
               return this.router.createUrlTree(can);
            } else {
               return this.router.parseUrl(can as string);
            }
         })
      );
   };
}

export const canActivate = (pipe: AuthPipeGenerator) => ({
   canActivate: [AuthGuard],
   data: { authGuardPipe: pipe },
});

export const isNotAnonymous: AuthPipe = map((user) => !!user && !user.isAnonymous);
