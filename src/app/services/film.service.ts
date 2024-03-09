import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// import the film interface
import { Film } from '../types/film.interface';

// import the message service
import { MessageService } from './message.service';

@Injectable({
   providedIn: 'root',
})
export class FilmService {
   private filmsUrl = '/api/films'; // URL to web api

   httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   };

   // inject "httpclient" in the film service
   constructor(private http: HttpClient, private messageService: MessageService) {}

   // GET: all film from the server
   getFilms(): Observable<Film[]> {
      return this.http.get<Film[]>(this.filmsUrl).pipe(
         tap(() => this.log('fetched films')),
         catchError(this.handleError<Film[]>('getFilms', []))
      );
   }

   // GET: film by id - Will 404 if id is not found
   getFilm(id: string | null): Observable<Film> {
      // create the url
      const url = `${this.filmsUrl}/${id}`;

      return this.http.get<Film>(url).pipe(
         tap(() => this.log(`fetched film id=${id}`)),
         catchError(this.handleError<Film>(`get Film id=${id}`))
      );
   }

   // GET: film whose name contains search term - SEARCH
   searchFilm(term: string): Observable<Film[]> {
      if (!term.trim()) {
         // if no search term, return an empty project arrary
         return of([]);
      }
      return this.http.get<Film[]>(`${this.filmsUrl}/?name=${term}`).pipe(
         tap((x) => (x.length ? this.log(`found films matching "${term}"`) : this.log(`no films matching "${term}"`))),
         catchError(this.handleError<Film[]>('search Films', []))
      );
   }

   // GET: film count from database
   getFilmCount(): Observable<number> {
      return this.http.get<number>('/api/film-count');
   }

   // GET: recent films added
   getRecentFilms(): Observable<Film[]> {
      return this.http.get<Film[]>('/api/recent-films');
   }

   // GET: featured films
   getFeaturedFilms(): Observable<Film[]> {
      return this.http.get<Film[]>('/api/featured-films');
   }

   // SAVE METHODS //

   // POST: add a new film to the server
   addFilm(newFilm: Film | object): Observable<Film> {
      return this.http.post<Film>(this.filmsUrl, newFilm, this.httpOptions).pipe(
         tap((newFilm: Film) => this.log(`added film with id=${newFilm._id}`)),
         catchError(this.handleError<Film>('addFilm'))
      );
   }

   // DELETE: a film by ID from the server
   deleteFilm(id: string): Observable<Film> {
      // create the url
      const url = `${this.filmsUrl}/${id}`;

      return this.http.delete<Film>(url, this.httpOptions).pipe(
         tap(() => this.log(`deleted film id=${id}`)),
         catchError(this.handleError<Film>('deleteFilm'))
      );
   }

   // PUT: update a film by ID on the server
   updateFilm(id: string, film: Film | object): Observable<object> {
      // create the url
      const url = `${this.filmsUrl}/${id}`;

      return this.http.patch(url, film, this.httpOptions).pipe(
         tap(() => this.log(`updated film id=${id}`)),
         catchError(this.handleError<object>('updateFilm'))
      );
   }

   // favoriteFilm(id: string): Observable<Film> {
   //    console.log("fix this")
   // }

   // handle Http operation that failed
   // let the app continue

   private handleError<T>(operation = 'operation', result?: T) {
      return (error: Error): Observable<T> => {
         // TODO: send the error to remote logging infrastructure
         console.error(error); // log to console instead

         // TODO: better job of transforming error for user comsumption
         this.log(`${operation} failed: ${error.message}`);

         // let the app keep running by returning an empty result
         return of(result as T);
      };
   }

   // Log a FilmService message with the messageService
   private log(message: string) {
      this.messageService.add(`FilmService: ${message}`);
   }
}