import { ParamMap } from '@angular/router';
import { OperatorFunction, map } from 'rxjs';
import { FilmDto } from '../types/film.interface';

interface GetParamSort {
   sortBy: keyof Omit<FilmDto, 'id'>;
   sortDirection: 'asc' | 'desc';
}

export const getParamSort = (): OperatorFunction<ParamMap, GetParamSort> => {
   return (input$) => {
      return input$.pipe(
         map((params) => {
            return {
               sortBy: (params.get('sortBy') || 'title') as keyof Omit<FilmDto, 'id'>,
               sortDirection: (params.get('sortDirection') || 'asc') as 'asc' | 'desc',
            };
         })
      );
   };
};
