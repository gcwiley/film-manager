import { Routes } from '@angular/router';

// import the pages
import {
   AboutPageComponent,
   ErrorPageComponent,
   FilmCreatePageComponent,
   FilmDetailsPageComponent,
   FilmGridPageComponent,
   HomePageComponent,
   NotFoundPageComponent,
   ResetPasswordPageComponent,
   SigninPageComponent,
   SignupPageComponent
} from './pages';

export const routes: Routes = [
    { path: '', component: HomePageComponent, title: 'My Film App' },
    { path: 'about', component: AboutPageComponent, title: 'About Page' },
    { path: 'reset-password', component: ResetPasswordPageComponent },
    { path: 'signin', component: SigninPageComponent },
    { path: 'signup', component: SignupPageComponent },
    { path: 'films', component: FilmGridPageComponent },
    { path: 'films/:id', component: FilmDetailsPageComponent },
    { path: 'films/create', component: FilmCreatePageComponent },
    { path: 'films/edit/:id', component: FilmCreatePageComponent },
    { path: 'error', component: ErrorPageComponent, title: "Error"},
    { path: '**', component: NotFoundPageComponent },
];
