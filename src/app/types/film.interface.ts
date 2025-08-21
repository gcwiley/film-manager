export type FilmRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';

// define the film interface
export interface Film {
    id: string;
    title: string;
    director: string;
    actors: string[];
    producers: string[];
    language: string;
    country: string;
    rating: FilmRating;
    releaseDate: Date;
    runningTime: number;
    genre: string;
    favorite: boolean;
    description: string;
    summary: string;
    keywords: string[];
    posterUrl: string;
 }

export type FilmInput = Omit<Film, 'id'>