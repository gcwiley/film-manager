import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { CanDeactivateGuardService } from './guards/can-deactivate.guard';

export const routes: Routes = [
  // homepage
  {
    path: '',
    pathMatch: 'full',
    title: 'My Film App',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  // about page
  {
    path: 'about',
    title: 'About',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/about-page/about-page.component').then(
        (m) => m.AboutPageComponent
      ),
  },
  // film grid page
  {
    path: 'films',
    title: 'My Films',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/film-pages/film-grid-page/film-grid-page.component').then(
        (m) => m.FilmGridPageComponent
      ),
  },
  // create film page
  {
    path: 'create',
    title: 'Create Film',
    canDeactivate: [CanDeactivateGuardService],
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './pages/film-pages/film-create-page/film-create-page.component'
      ).then((m) => m.FilmCreatePageComponent),
  },
  // signin page
  {
    path: 'signin',
    title: 'Sign In',
    loadComponent: () =>
      import('./pages/signin-page/signin-page.component').then(
        (m) => m.SigninPageComponent
      ),
  },
  // signup page
  {
    path: 'signup',
    title: 'Sign Up',
    loadComponent: () =>
      import('./pages/signup-page/signup-page.component').then(
        (m) => m.SignupPageComponent
      ),
  },
  // page not found
  {
    path: '404',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      ),
  },
  // fix this!
  {
    path: '**',
    redirectTo: '/404',
  },
];
