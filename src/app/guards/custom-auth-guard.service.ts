import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthPipeGenerator, loggedIn } from '@angular/fire/auth-guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { } from '@gilsdav/ngx-translate-router';
import { user } from 'rxfire/auth';
import { Observable, map, take } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class CustomAuthGuard {
   constructor() {}
}
