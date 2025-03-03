import { Routes } from '@angular/router';

// comment

export const routes: Routes = [
   // homepage
   {
      path: '',
      pathMatch: 'full',
      title: 'My Film App',
      loadComponent: () => import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
   },
   // about page
   {
      path: 'about',
      loadComponent: () => import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
      title: 'About'
   },
   // list film page
   {
      path: 'films',
      title: 'My Films',
      loadComponent: () =>
         import('./pages/film-pages/film-grid-page/film-grid-page.component').then((m) => m.FilmGridPageComponent),
   },
   // create film page
   {
      path: 'create',
      title: 'Create Film',
      loadComponent: () =>
         import('./pages/film-pages/film-create-page/film-create-page.component').then(
            (m) => m.FilmCreatePageComponent
         ),
      
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
