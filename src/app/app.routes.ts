import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: '',
      pathMatch: 'full',
      loadComponent: () => import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
   },
   {
      path: 'about',
      loadComponent: () => import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
   },
   {
      path: 'films',
      loadComponent: () =>
         import('./pages/film-pages/film-grid-page/film-grid-page.component').then((m) => m.FilmGridPageComponent),
   },
   {
      path: 'create',
      loadComponent: () =>
         import('./pages/film-pages/film-create-page/film-create-page.component').then(
            (m) => m.FilmCreatePageComponent
         ),
   },
   {
      path: 'signin',
      loadComponent: () => import('./pages/signin-page/signin-page.component').then((m) => m.SigninPageComponent),
   },
   {
      path: '404',
      loadComponent: () =>
         import('./pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
   },
   {
      path: '**',
      redirectTo: '/404',
   },
];
