// define the film interface
export interface Film {
    id: string;
    title: string;
    director: string;
    releaseDate: string;
    genre: string;
    summary: string;
    createdAt: string;
    updatedAt: string;
 }
 
 // define the genre inferface
 export interface Genre {
   value: string,
   viewValue: string
 }