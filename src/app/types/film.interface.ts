// define the film interface
export interface Film {
    id: string;
    title: string;
    director: string;
    releaseDate: string;
    runningTime: string,
    genre: string;
    favorite: boolean;
    description: string;
    posterUrl: string;
 }

export type FilmInput = Omit<Film, 'id'>