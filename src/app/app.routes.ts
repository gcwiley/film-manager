import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: '',
      pathMatch: 'full',
      loadComponent: () => import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
      title: 'My Film App'
   },
   {
      path: 'about',
      loadComponent: () => import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
      title: 'About'
   },
   {
      path: 'films',
      loadComponent: () =>
         import('./pages/film-pages/film-grid-page/film-grid-page.component').then((m) => m.FilmGridPageComponent),
      title: 'My Films'
   },
   {
      path: 'create',
      loadComponent: () =>
         import('./pages/film-pages/film-create-page/film-create-page.component').then(
            (m) => m.FilmCreatePageComponent
         ),
      title: 'Create Film'
   },
   {
      path: 'signin',
      loadComponent: () => import('./pages/signin-page/signin-page.component').then((m) => m.SigninPageComponent),
      title: 'Sign In'
   },
   {
      path: 'signup',
      loadComponent: () => import('./pages/signup-page/signup-page.component').then((m) => m.SignupPageComponent),
      title: 'Sign Up'
   },
   {
      path: '404',
      loadComponent: () =>
         import('./pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
      title: 'Page Not Found'
   },
   {
      path: '**',
      redirectTo: '/404',
   },
];
