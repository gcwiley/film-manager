import { Routes } from '@angular/router';

// import the pages
import {
   AboutPageComponent,
   FeedbackPageComponent,
   FilmCreatePageComponent,
   FilmDetailsPageComponent,
   FilmGridPageComponent,
   HomePageComponent,
   IssuesPageComponent,
   NotFoundPageComponent,
   ResetPasswordPageComponent,
   SigninPageComponent,
   SignupPageComponent
} from './pages';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'issues', component: IssuesPageComponent },
    { path: 'feedback', component: FeedbackPageComponent },
    { path: 'reset-password', component: ResetPasswordPageComponent },
    { path: 'signin', component: SigninPageComponent },
    { path: 'signup', component: SignupPageComponent },
    // film pages
    { path: 'films', component: FilmGridPageComponent },
    { path: 'films/:id', component: FilmDetailsPageComponent },
    { path: 'create-film', component: FilmCreatePageComponent },
    { path: 'edit/:id', component: FilmCreatePageComponent },
    { path: '**', component: NotFoundPageComponent },
];
