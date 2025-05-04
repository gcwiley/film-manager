// define the film interface
export interface Film {
    id: string;
    title: string;
    director: string;
    releaseDate: string;
    genre: string;
    favorite: boolean;
    summary: string;
 }

export type FilmInput = Omit<Film, 'id'>