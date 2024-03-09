// define the film interface
export interface Film {
    _id?: string;
    title: string;
    director: string;
    releaseDate: string;
    genre: string;
    summary: string;
 }
 
 // define the genre inferface
 export interface Genre {
   value: string,
   viewValue: string
 }