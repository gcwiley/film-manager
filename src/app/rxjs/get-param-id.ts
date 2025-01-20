/*

The getParamId function is designed to extract the 'id' parameter from a stream of ParamMap Objects, typically within an angular route.
*/

import { ParamMap } from '@angular/router';
import { OperatorFunction, map } from 'rxjs';

export const getParamId = (): OperatorFunction<ParamMap, string> => {
   return (input$) => {
      return input$.pipe(map((params) => params.get('id') || ''));
   };
};
